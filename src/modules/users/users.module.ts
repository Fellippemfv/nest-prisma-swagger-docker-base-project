import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";

import { ListAllUsersController } from "./useCases/listAllUsers/listAllUsers.controller";
import { ListAllUsersService } from "./useCases/listAllUsers/listAllUsers.service";

@Module({
    controllers: [ListAllUsersController],
    providers: [ListAllUsersService, PrismaService],
})
export class UsersModule {}
