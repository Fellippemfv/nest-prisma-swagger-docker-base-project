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
import { Public, Roles } from "src/modules/auth/common/decorators";
import { RtGuard } from "src/modules/auth/common/guards";
import { RolesGuard } from "src/modules/auth/common/guards/roles.guard";
import { Role } from "src/modules/auth/entities/role.enum";
import { ListAllUsersService } from "./listAllUsers.service";

@ApiTags("Users")
@Controller("users")
export class ListAllUsersController {
    constructor(private readonly listAllUsersService: ListAllUsersService) {}
    @Public()
    @Roles(Role.Admin, Role.Moderator)
    @UseGuards(RtGuard, RolesGuard)
    @Get("/all")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Show all users",
    })
    @ApiOkResponse({ description: "Users has been successfully show" })
    @ApiForbiddenResponse({ description: "Forbidden resource" })
    async findAll() {
        return this.listAllUsersService.findAll();
    }
}
