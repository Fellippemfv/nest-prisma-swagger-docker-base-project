import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";
import { PrismaService } from "src/database/PrismaService";
import { Tokens } from "../../common/types";
import { AuthDto } from "../../dto";
import { AuthTokenGetService } from "../token/tokenGet.service";
import { AuthTokenUpdateRtHashService } from "../token/tokenUpdateRtHash.service";

@Injectable()
export class AuthSignupService {
    constructor(
        private prisma: PrismaService,
        private authTokenGetService: AuthTokenGetService,
        private authTokenUpdateRtHashService: AuthTokenUpdateRtHashService,
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

        const tokens = await this.authTokenGetService.getTokens(
            user.id,
            user.email,
            user.role,
        );
        await this.authTokenUpdateRtHashService.updateRtHash(
            user.id,
            tokens.refresh_token,
        );

        return tokens;
    }
}
