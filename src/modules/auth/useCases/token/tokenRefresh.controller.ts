import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from "@nestjs/common";
import {
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import {
    GetCurrentUser,
    GetCurrentUserId,
    Public,
} from "src/modules/auth/common/decorators";
import { RtGuard } from "src/modules/auth/common/guards";
import { Tokens } from "../../common/types";
import { AuthTokenRefreshService } from "./tokenRefresh.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthTokenRefreshController {
    constructor(private authTokenRefreshService: AuthTokenRefreshService) {}

    @Public()
    @UseGuards(RtGuard)
    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Refresh user token",
    })
    @ApiOkResponse({ description: "Token has been successfully refresh" })
    @ApiForbiddenResponse({
        description: "Access Denied",
    })
    refreshTokens(
        @GetCurrentUserId() userId: string,
        @GetCurrentUser("refreshToken") refreshToken: string,
    ): Promise<Tokens> {
        return this.authTokenRefreshService.refreshTokens(userId, refreshToken);
    }
}
