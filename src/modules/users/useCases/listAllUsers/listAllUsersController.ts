import { Controller, Get } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "../../entities/user.entity";
import { ListAllUsersService } from "../../useCases/listAllUsers/listAllUsersService";

@Controller("users")
@ApiTags("users")
export class ListAllUsersController {
    constructor(private readonly listAllUsersService: ListAllUsersService) {}

    @Get()
    @ApiOperation({
        summary: "Show all users",
    })
    @ApiCreatedResponse({ type: UserEntity })
    async findAll() {
        return this.listAllUsersService.findAll();
    }
}
