import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class UserProfileMeService {
    constructor(private prisma: PrismaService) {}

    async findOne(userId: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: userId,
                deleted: false,
            },
        });

        if (!user) {
            throw new ForbiddenException(
                "This user does not exist or has been soft delete/ hard delete",
            );
        }

        const { email, name, about, role, createdAt, updatedAt } = user;

        return { email, name, about, role, createdAt, updatedAt };
    }
}
