import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload, Tokens } from "../../common/types";

@Injectable()
export class AuthTokenGetService {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
    ) {}

    async getTokens(
        userId: string,
        email: string,
        role: string,
    ): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email: email,
            role: role,
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
