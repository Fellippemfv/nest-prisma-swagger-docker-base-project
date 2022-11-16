import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
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

import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Tokens } from "./common/types";

@ApiTags("User authentication")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post("local/signup")
    @ApiOperation({
        summary: "Create a user",
    })
    @ApiCreatedResponse({ description: "User has been successfully created" })
    @ApiBadRequestResponse({
        description: "Some character error or type error",
    })
    @ApiForbiddenResponse({
        description: "User already exists",
    })
    signupLocal(@Body() data: AuthDto): Promise<Tokens> {
        return this.authService.signupLocal(data);
    }

    @Public()
    @Post("local/signin")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Login with a user",
    })
    @ApiOkResponse({ description: "User has been successfully logged in" })
    @ApiBadRequestResponse({
        description: "Some character error or type error",
    })
    @ApiForbiddenResponse({
        description: "Email or password incorrect",
    })
    signinLocal(@Body() data: AuthDto): Promise<Tokens> {
        return this.authService.signinLocal(data);
    }

    @Post("logout")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Logout with a user",
    })
    @ApiOkResponse({ description: "User has been successfully logout" })
    logout(@GetCurrentUserId() userId: string): Promise<boolean> {
        return this.authService.logout(userId);
    }

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
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
