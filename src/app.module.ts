import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "./common/guards";
import { PrismaService } from "./database/PrismaService";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
    providers: [
        PrismaService,
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
    ],
})
export class AppModule {}
