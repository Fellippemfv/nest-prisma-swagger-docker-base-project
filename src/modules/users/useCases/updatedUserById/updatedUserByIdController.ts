import { Body, Controller, Param, Put } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { UpdatedUserByIdService } from "../../useCases/updatedUserById/updatedUserByIdService";

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
    @ApiCreatedResponse({ type: UserEntity })
    async update(@Param("id") id: string, @Body() data: UpdateUserDto) {
        return this.updatedUserByIdService.update(id, data);
    }
}
