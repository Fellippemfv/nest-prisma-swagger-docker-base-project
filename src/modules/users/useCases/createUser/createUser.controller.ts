import { Body, Controller, Post } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { CreateUserService } from "./createUser.service";

@Controller("users")
@ApiTags("users")
export class CreateUserController {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post()
    @ApiOperation({
        summary: "Create a user",
    })
    @ApiCreatedResponse({
        type: UserEntity,
        description: "The user has been successfully created.",
    })
    @ApiBadRequestResponse({ description: "User already exists!" })
    async create(@Body() data: CreateUserDto) {
        return this.createUserService.create(data);
    }
}
