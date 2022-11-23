import {
    Controller,
    Param,
    HttpCode,
    HttpStatus,
    UseGuards,
    Patch,
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
import { DeleteUserSoftRevertService } from "./deleteUserSoftRevert.service";

@ApiTags("Users")
@Controller("users")
export class DeleteUserSoftRevertController {
    constructor(
        private readonly deleteUserSoftRevertService: DeleteUserSoftRevertService,
    ) {}
    @Public()
    @Roles(Role.Administrator)
    @UseGuards(RtGuard, RolesGuard)
    @Patch("delete/soft/revert/:id")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Revert a user soft delete",
    })
    @ApiOkResponse({
        description: "Users has been successfully revert",
    })
    @ApiForbiddenResponse({ description: "Forbidden resource" })
    async softDeleted(@Param("id") id: string) {
        return this.deleteUserSoftRevertService.delete(id);
    }
}
