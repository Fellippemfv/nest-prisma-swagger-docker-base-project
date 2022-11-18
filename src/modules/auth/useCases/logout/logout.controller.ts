import { Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetCurrentUserId } from "src/modules/auth/common/decorators";
import { AuthLogoutService } from "./logout.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthLogoutController {
    constructor(private authLogoutService: AuthLogoutService) {}

    @Post("logout")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Logout with a user",
    })
    @ApiOkResponse({ description: "User has been successfully logout" })
    logout(@GetCurrentUserId() userId: string): Promise<boolean> {
        return this.authLogoutService.logout(userId);
    }
}
