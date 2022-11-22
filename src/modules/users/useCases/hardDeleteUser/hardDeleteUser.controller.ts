import {
    Controller,
    Param,
    HttpCode,
    HttpStatus,
    UseGuards,
    Delete,
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
import { HardDeleteUserService } from "./hardDeleteUser.service";

@ApiTags("Users")
@Controller("users")
export class HardDeleteUserController {
    constructor(
        private readonly hardDeleteUserService: HardDeleteUserService,
    ) {}
    @Public()
    @Roles(Role.Administrator)
    @UseGuards(RtGuard, RolesGuard)
    @Delete("/delete/hard/:id")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "User hard delete",
    })
    @ApiOkResponse({ description: "Users has been successfully hard delete" })
    @ApiForbiddenResponse({ description: "Forbidden resource" })
    async softDeleted(@Param("id") id: string) {
        return this.hardDeleteUserService.delete(id);
    }
}
