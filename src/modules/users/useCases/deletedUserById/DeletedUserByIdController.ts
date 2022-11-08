import { Controller, Delete, Param } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "../../entities/user.entity";
import { DeletedUserByIdService } from "./DeletedUserByIdService";

@Controller("users")
@ApiTags("users")
export class DeletedUserByIdController {
    constructor(
        private readonly deletedUserByIdService: DeletedUserByIdService,
    ) {}

    @Delete(":id")
    @ApiOperation({
        summary: "Delete a user by id",
    })
    @ApiCreatedResponse({ type: UserEntity })
    async remove(@Param("id") id: string) {
        return this.deletedUserByIdService.delete(id);
    }
}
