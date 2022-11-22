import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import {
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import { Public } from "src/modules/auth/common/decorators";
import { UserProfileService } from "./userProfile.service";

@ApiTags("Users")
@Controller("user")
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) {}
    @Public()
    @Get("/:slugId")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Show user profile",
    })
    @ApiOkResponse({ description: "User has been successfully show" })
    @ApiForbiddenResponse({ description: "Forbidden resource" })
    async findOne(@Param("slugId") slugId: string) {
        return this.userProfileService.findOne(slugId);
    }
}
