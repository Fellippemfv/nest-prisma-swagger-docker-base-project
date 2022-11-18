import { Body, Controller, Post } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import { Public } from "src/modules/auth/common/decorators";
import { Tokens } from "../../common/types";
import { AuthDto } from "../../dto";
import { AuthSignupService } from "./signup.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthSignupController {
    constructor(private authSignupService: AuthSignupService) {}

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
        return this.authSignupService.signupLocal(data);
    }
}
