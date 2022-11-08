import { Module } from "@nestjs/common";

import { PrismaService } from "src/database/PrismaService";

import { CreateUserController } from "../users/useCases/createUser/createUserController";
import { CreateUserService } from "../users/useCases/createUser/createUserService";
import { ListAllUsersController } from "./useCases/listAllUsers/listAllUsersController";
import { ListAllUsersService } from "./useCases/listAllUsers/listAllUsersService";
import { ListOneUserByIdController } from "./useCases/listOneUserById/listOneUserByIdController";
import { ListOneUserByIdService } from "./useCases/listOneUserById/listOneUserByIdService";
import { UpdatedUserByIdController } from "./useCases/updatedUserById/updatedUserByIdController";
import { UpdatedUserByIdService } from "./useCases/updatedUserById/updatedUserByIdService";
import { DeletedUserByIdController } from "./useCases/deletedUserById/DeletedUserByIdController";
import { DeletedUserByIdService } from "./useCases/deletedUserById/DeletedUserByIdService";

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
