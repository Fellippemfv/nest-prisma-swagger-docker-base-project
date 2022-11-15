import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";
import { PrismaService } from "src/database/PrismaService";

import { AuthDto } from "./dto";
import { JwtPayload, Tokens } from "./types";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) {}

    async signupLocal(data: AuthDto): Promise<Tokens> {
        const userAlreadyExists = await this.prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });

        if (userAlreadyExists) {
            throw new ForbiddenException("User already exists");
        }

        const hash = await argon.hash(data.password);
        const user = await this.prisma.user
            .create({
                data: {
                    email: data.email,
                    name: data.name,
                    hash,
                },
            })
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === "P2002") {
                        throw new ForbiddenException("Credentials incorrect");
                    }
                }
                throw error;
            });

        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async signinLocal(data: AuthDto): Promise<Tokens> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (!user) {
            throw new ForbiddenException("Email or password incorrect");
        }

        const passwordMatches = await argon.verify(user.hash, data.password);

        if (!passwordMatches) {
            throw new ForbiddenException("Email or password incorrect");
        }

        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async logout(userId: string): Promise<boolean> {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null,
                },
            },
            data: {
                hashedRt: null,
            },
        });
        return true;
    }

    async refreshTokens(userId: string, rt: string): Promise<Tokens> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user || !user.hashedRt) {
            throw new ForbiddenException("Access Denied");
        }

        const rtMatches = await argon.verify(user.hashedRt, rt);
        if (!rtMatches) {
            throw new ForbiddenException("Access Denied");
        }

        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async updateRtHash(userId: string, rt: string): Promise<void> {
        const hash = await argon.hash(rt);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hash,
            },
        });
    }

    async getTokens(userId: string, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email: email,
        };

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>("AT_SECRET"),
                expiresIn: "15m",
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>("RT_SECRET"),
                expiresIn: "7d",
            }),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
        };
    }
}
