import {
    Body,
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
    GetCurrentUserId,
    Public,
    Roles,
} from "src/modules/auth/common/decorators";
import { RolesGuard, RtGuard } from "src/modules/auth/common/guards";
import { Role } from "src/modules/auth/entities/role.enum";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { UpdateUserProfilePrivateService } from "./updateUserProfilePrivate.service";

@ApiTags("Profile")
@Controller("profile")
export class UpdateUserProfilePrivateController {
    constructor(
        private readonly updateUserProfilePrivateService: UpdateUserProfilePrivateService,
    ) {}
    @Public()
    @Roles(Role.Administrator, Role.Author, Role.Editor, Role.User)
    @UseGuards(RtGuard, RolesGuard)
    @Post("/me")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Update my profile",
    })
    @ApiOkResponse({ description: "User has been successfully updated" })
    @ApiForbiddenResponse({ description: "Forbidden resource" })
    findOne(@GetCurrentUserId() userId: string, @Body() data: UpdateUserDto) {
        return this.updateUserProfilePrivateService.findOne(userId, data);
    }
}
