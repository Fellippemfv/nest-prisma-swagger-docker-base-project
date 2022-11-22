import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseGuards,
} from "@nestjs/common";
import {
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import {
    GetCurrentUserId,
    Public,
    Roles,
} from "src/modules/auth/common/decorators";
import { RolesGuard, RtGuard } from "src/modules/auth/common/guards";
import { Role } from "src/modules/auth/entities/role.enum";
import { UserProfileMeService } from "./userProfileMe.service";

@ApiTags("Users")
@Controller("users")
export class UserProfileMeController {
    constructor(private readonly userProfileMeService: UserProfileMeService) {}
    @Public()
    @Roles(Role.Administrator, Role.Author, Role.Editor, Role.User)
    @UseGuards(RtGuard, RolesGuard)
    @Get("/profile/me")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Show my profile",
    })
    @ApiOkResponse({ description: "User has been successfully show" })
    @ApiForbiddenResponse({ description: "Forbidden resource" })
    findOne(@GetCurrentUserId() userId: string) {
        return this.userProfileMeService.findOne(userId);
    }
}
