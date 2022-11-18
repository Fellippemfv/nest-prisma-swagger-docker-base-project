import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import { Public } from "src/modules/auth/common/decorators";
import { Tokens } from "../../common/types";
import { AuthDto } from "../../dto";
import { AuthSigninService } from "./signin.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthSigninController {
    constructor(private authSigninService: AuthSigninService) {}

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
        return this.authSigninService.signinLocal(data);
    }
}
