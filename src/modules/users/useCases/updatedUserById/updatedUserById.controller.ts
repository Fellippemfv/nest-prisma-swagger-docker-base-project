import { Body, Controller, Param, Put } from "@nestjs/common";
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { UpdatedUserByIdService } from "./updatedUserById.service";

@Controller("users")
@ApiTags("users")
export class UpdatedUserByIdController {
    constructor(
        private readonly updatedUserByIdService: UpdatedUserByIdService,
    ) {}

    @Put(":id")
    @ApiOperation({
        summary: "Update a user by id",
    })
    @ApiOkResponse({
        description: "User have been successfully deleted.",
    })
    @ApiNotFoundResponse({ description: "User does not exists!" })
    async update(@Param("id") id: string, @Body() data: UpdateUserDto) {
        return this.updatedUserByIdService.update(id, data);
    }
}
