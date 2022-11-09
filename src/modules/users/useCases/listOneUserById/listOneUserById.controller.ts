import { Controller, Get, Param } from "@nestjs/common";
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import { ListOneUserByIdService } from "./listOneUserById.service";

@Controller("users")
@ApiTags("users")
export class ListOneUserByIdController {
    constructor(
        private readonly listOneUserByIdService: ListOneUserByIdService,
    ) {}

    @Get(":id")
    @ApiOperation({ summary: "Show a user by id" })
    @ApiOkResponse({ description: "A user has been successfully displayed." })
    @ApiNotFoundResponse({ description: "User does not exists!" })
    async findOne(@Param("id") id: string) {
        return this.listOneUserByIdService.findOne(id);
    }
}
