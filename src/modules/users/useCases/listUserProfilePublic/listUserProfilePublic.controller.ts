import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import {
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import { Public } from "src/modules/auth/common/decorators";
import { ListUserProfilePublicService } from "./listUserProfilePublic.service";

@ApiTags("Profile")
@Controller("profile")
export class ListUserProfilePublicController {
    constructor(
        private readonly listUserProfilePublicService: ListUserProfilePublicService,
    ) {}
    @Public()
    @Get("/user/:slugId")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Show public user profile",
    })
    @ApiOkResponse({ description: "User has been successfully show" })
    @ApiForbiddenResponse({ description: "Forbidden resource" })
    async findOne(@Param("slugId") slugId: string) {
        return this.listUserProfilePublicService.findOne(slugId);
    }
}
