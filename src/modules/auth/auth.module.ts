import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/database/PrismaService";

import { AtStrategy, RtStrategy } from "./common/strategies";
import { AuthLogoutController } from "./useCases/logout/logout.controller";
import { AuthLogoutService } from "./useCases/logout/logout.service";
import { AuthSigninController } from "./useCases/signin/signin.controller";
import { AuthSigninService } from "./useCases/signin/signin.service";
import { AuthSignupController } from "./useCases/signup/signup.controller";
import { AuthSignupService } from "./useCases/signup/signup.service";
import { AuthTokenGetService } from "./useCases/token/tokenGet.service";
import { AuthTokenRefreshController } from "./useCases/token/tokenRefresh.controller";
import { AuthTokenRefreshService } from "./useCases/token/tokenRefresh.service";
import { AuthTokenUpdateRtHashService } from "./useCases/token/tokenUpdateRtHash.service";

@Module({
    imports: [JwtModule.register({})],
    controllers: [
        AuthSignupController,
        AuthSigninController,
        AuthLogoutController,
        AuthTokenRefreshController,
    ],
    providers: [
        AtStrategy,
        RtStrategy,
        PrismaService,
        AuthSignupService,
        AuthSigninService,
        AuthLogoutService,
        AuthTokenGetService,
        AuthTokenRefreshService,
        AuthTokenUpdateRtHashService,
    ],
})
export class AuthModule {}
