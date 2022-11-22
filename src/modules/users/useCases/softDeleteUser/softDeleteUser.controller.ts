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
import { SoftDeleteUserService } from "./softDeleteUser.service";

@ApiTags("Users")
@Controller("users")
export class SoftDeleteUserController {
    constructor(
        private readonly softDeleteUserService: SoftDeleteUserService,
    ) {}
    @Public()
    @Roles(Role.Administrator)
    @UseGuards(RtGuard, RolesGuard)
    @Patch("/delete/soft/:id")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "User soft delete",
    })
    @ApiOkResponse({ description: "Users has been successfully sof delete" })
    @ApiForbiddenResponse({ description: "Forbidden resource" })
    async softDeleted(@Param("id") id: string) {
        return this.softDeleteUserService.delete(id);
    }
}
