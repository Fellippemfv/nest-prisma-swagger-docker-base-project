import { Controller, Get, Param } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "../../entities/user.entity";
import { ListOneUserByIdService } from "../../useCases/listOneUserById/listOneUserByIdService";

@Controller("users")
@ApiTags("users")
export class ListOneUserByIdController {
    constructor(
        private readonly listOneUserByIdService: ListOneUserByIdService,
    ) {}

    @Get(":id")
    @ApiOperation({
        summary: "Show only one user by id",
    })
    @ApiCreatedResponse({ type: UserEntity })
    async findOne(@Param("id") id: string) {
        return this.listOneUserByIdService.findOne(id);
    }
}
