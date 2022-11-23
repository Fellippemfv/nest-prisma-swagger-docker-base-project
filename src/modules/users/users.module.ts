import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";

import { ListAllUsersController } from "./useCases/listAllUsers/listAllUsers.controller";
import { ListAllUsersService } from "./useCases/listAllUsers/listAllUsers.service";
import { ListAllUsersDeletedController } from "./useCases/listAllUsersDeleted/listAllUsersDeleted.controller";
import { ListAllUsersDeletedService } from "./useCases/listAllUsersDeleted/listAllUsersDeleted.service";
import { DeleteUserHardService } from "./useCases/deleteUserHard/deleteUserHard.service";
import { DeleteUserHardController } from "./useCases/deleteUserHard/deleteUserHard.controller";
import { DeleteUserSoftController } from "./useCases/deleteUserSoft/deleteUserSoft.controller";
import { DeleteUserSoftService } from "./useCases/deleteUserSoft/deleteUserSoft.service";
import { DeleteUserSoftRevertController } from "./useCases/deleteUserSoftRevert/deleteUserSoftRevert.controller";
import { DeleteUserSoftRevertService } from "./useCases/deleteUserSoftRevert/deleteUserSoftRevert.service";
import { ListUserProfilePrivateController } from "./useCases/listUserProfilePrivate/listUserProfilePrivate.controller";
import { ListUserProfilePrivateService } from "./useCases/listUserProfilePrivate/listUserProfilePrivate.service";
import { ListUserProfilePublicController } from "./useCases/listUserProfilePublic/listUserProfilePublic.controller";
import { ListUserProfilePublicService } from "./useCases/listUserProfilePublic/listUserProfilePublic.service";
import { UpdateUserProfilePrivateController } from "./useCases/updateUserProfilePrivate/updateUserProfilePrivate.controller";
import { UpdateUserProfilePrivateService } from "./useCases/updateUserProfilePrivate/updateUserProfilePrivate.service";

@Module({
    controllers: [
        ListAllUsersController,
        ListAllUsersDeletedController,
        DeleteUserSoftController,
        DeleteUserSoftRevertController,
        DeleteUserHardController,
        ListUserProfilePublicController,
        ListUserProfilePrivateController,
        UpdateUserProfilePrivateController,
    ],
    providers: [
        ListAllUsersService,
        ListAllUsersDeletedService,
        DeleteUserSoftService,
        DeleteUserSoftRevertService,
        DeleteUserHardService,
        ListUserProfilePublicService,
        ListUserProfilePrivateService,
        UpdateUserProfilePrivateService,
        PrismaService,
    ],
})
export class UsersModule {}
