import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { HardDeleteUserController } from "./useCases/hardDeleteUser/hardDeleteUser.controller";
import { HardDeleteUserService } from "./useCases/hardDeleteUser/hardDeleteUser.service";

import { ListAllUsersController } from "./useCases/listAllUsers/listAllUsers.controller";
import { ListAllUsersService } from "./useCases/listAllUsers/listAllUsers.service";
import { ListAllUsersDeletedController } from "./useCases/listAllUsersDeleted/listAllUsersDeleted.controller";
import { ListAllUsersDeletedService } from "./useCases/listAllUsersDeleted/listAllUsersDeleted.service";
import { RevertSoftDeleteUserController } from "./useCases/revertSoftDeleteUser/revertSoftDeleteUser.controller";
import { RevertSoftDeleteUserService } from "./useCases/revertSoftDeleteUser/revertSoftDeleteUser.service";
import { SoftDeleteUserController } from "./useCases/softDeleteUser/softDeleteUser.controller";
import { SoftDeleteUserService } from "./useCases/softDeleteUser/softDeleteUser.service";
import { UserProfileController } from "./useCases/userProfile/userProfile.controller";
import { UserProfileService } from "./useCases/userProfile/userProfile.service";
import { UserProfileMeController } from "./useCases/userProfileMe/userProfileMe.controller";
import { UserProfileMeService } from "./useCases/userProfileMe/userProfileMe.service";
import { UserProfileMeUpdateController } from "./useCases/userProfileMeUpdate/userProfileMeUpdate.controller";
import { UserProfileMeUpdateService } from "./useCases/userProfileMeUpdate/userProfileMeUpdate.service";

@Module({
    controllers: [
        ListAllUsersController,
        ListAllUsersDeletedController,
        SoftDeleteUserController,
        RevertSoftDeleteUserController,
        HardDeleteUserController,
        UserProfileController,
        UserProfileMeController,
        UserProfileMeUpdateController,
    ],
    providers: [
        ListAllUsersService,
        ListAllUsersDeletedService,
        SoftDeleteUserService,
        RevertSoftDeleteUserService,
        HardDeleteUserService,
        UserProfileService,
        UserProfileMeService,
        UserProfileMeUpdateService,
        PrismaService,
    ],
})
export class UsersModule {}
