import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import {
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import { Public } from "src/modules/auth/common/decorators";
import { UserProfileService } from "./userProfile.service";

@ApiTags("Profile")
@Controller("profile")
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {}
    @Public()
    @Get("/user/:slugId")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Show public user profile",
    })
    @ApiOkResponse({ description: "User has been successfully show" })
    @ApiForbiddenResponse({ description: "Forbidden resource" })
    async findOne(@Param("slugId") slugId: string) {
        return this.userProfileService.findOne(slugId);
    }
}
