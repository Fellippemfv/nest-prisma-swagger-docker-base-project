import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";

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
import { ListUsersAllController } from "./useCases/listUsersAll/listUsersAll.controller";
import { ListUsersAllService } from "./useCases/listUsersAll/listUsersAll.service";
import { ListUsersAllDeletedController } from "./useCases/listUsersAllDeleted/listUsersAllDeleted.controller";
import { ListUsersAllDeletedService } from "./useCases/listUsersAllDeleted/listUsersAllDeleted.service";

@Module({
    controllers: [
        ListUsersAllController,
        ListUsersAllDeletedController,
        DeleteUserSoftController,
        DeleteUserSoftRevertController,
        DeleteUserHardController,
        ListUserProfilePublicController,
        ListUserProfilePrivateController,
        UpdateUserProfilePrivateController,
    ],
    providers: [
        ListUsersAllService,
        ListUsersAllDeletedService,
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
