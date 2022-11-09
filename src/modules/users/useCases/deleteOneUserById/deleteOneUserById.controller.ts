import { Controller, Delete, Param } from "@nestjs/common";
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import { DeletedUserByIdService } from "./deleteOneUserById.service";

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
    @ApiOkResponse({ description: "A user has been successfully deleted." })
    @ApiNotFoundResponse({ description: "User does not exists!" })
    async remove(@Param("id") id: string) {
        return this.deletedUserByIdService.delete(id);
    }
}
