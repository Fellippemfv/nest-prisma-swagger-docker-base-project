import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class UserProfileService {
    constructor(private prisma: PrismaService) {}

    async findOne(slugId: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                slugId,
                deleted: false,
            },
        });

        if (!user) {
            throw new ForbiddenException(
                "This user does not exist or has been delete",
            );
        }

        /*         const userReturn = user.name; */
        const { name, about, createdAt, updatedAt } = user;

        return { name, about, createdAt, updatedAt };
    }
}
