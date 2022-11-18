import { ForbiddenException, Injectable } from "@nestjs/common";
import * as argon from "argon2";
import { PrismaService } from "src/database/PrismaService";
import { Tokens } from "../../common/types";
import { AuthTokenGetService } from "./tokenGet.service";
import { AuthTokenUpdateRtHashService } from "./tokenUpdateRtHash.service";

@Injectable()
export class AuthTokenRefreshService {
    constructor(
        private prisma: PrismaService,
        private authTokenGetService: AuthTokenGetService,
        private authTokenUpdateRtHashService: AuthTokenUpdateRtHashService,
    ) {}

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
