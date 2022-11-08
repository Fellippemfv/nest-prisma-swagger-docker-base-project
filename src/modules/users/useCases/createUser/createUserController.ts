import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { CreateUserService } from "../../useCases/createUser/createUserService";

@Controller("users")
@ApiTags("users")
export class CreateUserController {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post()
    @ApiOperation({
        summary: "Create a user",
    })
    @ApiCreatedResponse({ type: UserEntity })
    async create(@Body() data: CreateUserDto) {
        return this.createUserService.create(data);
    }
}
