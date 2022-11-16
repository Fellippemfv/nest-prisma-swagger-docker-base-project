import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseGuards,
} from "@nestjs/common";
import {
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Public, Roles } from "src/modules/auth/common/decorators";
import { RtGuard } from "src/modules/auth/common/guards";
import { RolesGuard } from "src/modules/auth/common/guards/roles.guard";
import { Role } from "src/modules/auth/entities/role.enum";
import { ListAllUsersService } from "./listAllUsers.service";

@Controller("users")
export class ListAllUsersController {
    constructor(private readonly listAllUsersService: ListAllUsersService) {}
    @Public()
    @Roles(Role.Admin)
    @UseGuards(RtGuard, RolesGuard)
    @Get("/all")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: "Users has been successfully show" })
    @ApiUnauthorizedResponse({ description: "Unauthorized" })
    @ApiOperation({
        summary: "Show all users",
    })
    async findAll() {
        return this.listAllUsersService.findAll();
    }
}
