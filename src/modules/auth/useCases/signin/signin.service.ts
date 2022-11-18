import { ForbiddenException, Injectable } from "@nestjs/common";
import * as argon from "argon2";
import { PrismaService } from "src/database/PrismaService";
import { Tokens } from "../../common/types";
import { AuthDto } from "../../dto";
import { AuthTokenGetService } from "../token/tokenGet.service";
import { AuthTokenUpdateRtHashService } from "../token/tokenUpdateRtHash.service";

@Injectable()
export class AuthSigninService {
    constructor(
        private prisma: PrismaService,
        private authTokenGetService: AuthTokenGetService,
        private authTokenUpdateRtHashService: AuthTokenUpdateRtHashService,
    ) {}

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
