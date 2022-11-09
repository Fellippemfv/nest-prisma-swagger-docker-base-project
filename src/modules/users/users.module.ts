import { Module } from "@nestjs/common";

import { PrismaService } from "src/database/PrismaService";

import { CreateUserController } from "./useCases/createUser/createUser.controller";
import { CreateUserService } from "./useCases/createUser/createUser.service";
import { ListAllUsersController } from "./useCases/listAllUsers/listAllUsers.controller";
import { ListAllUsersService } from "./useCases/listAllUsers/listAllUsers.service";
import { ListOneUserByIdController } from "./useCases/listOneUserById/listOneUserById.controller";
import { ListOneUserByIdService } from "./useCases/listOneUserById/listOneUserById.service";
import { UpdatedUserByIdController } from "./useCases/updatedUserById/updatedUserById.controller";
import { UpdatedUserByIdService } from "./useCases/updatedUserById/updatedUserById.service";
import { DeletedUserByIdController } from "./useCases/deletedUserById/deletedUserById.controller";
import { DeletedUserByIdService } from "./useCases/deletedUserById/deletedUserById.service";

@Module({
    controllers: [
        CreateUserController,
        ListAllUsersController,
        ListOneUserByIdController,
        UpdatedUserByIdController,
        DeletedUserByIdController,
    ],

    providers: [
        PrismaService,
        CreateUserService,
        ListAllUsersService,
        ListOneUserByIdService,
        UpdatedUserByIdService,
        DeletedUserByIdService,
    ],
})
export class UsersModule {}
