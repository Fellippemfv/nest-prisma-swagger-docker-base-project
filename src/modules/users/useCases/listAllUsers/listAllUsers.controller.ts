import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ListAllUsersService } from "./listAllUsers.service";

@Controller("users")
@ApiTags("users")
export class ListAllUsersController {
    constructor(private readonly listAllUsersService: ListAllUsersService) {}

    @Get()
    @ApiOperation({
        summary: "Show all users",
    })
    @ApiOkResponse({
        description: "All users have been successfully displayed.",
    })
    async findAll() {
        return this.listAllUsersService.findAll();
    }
}
