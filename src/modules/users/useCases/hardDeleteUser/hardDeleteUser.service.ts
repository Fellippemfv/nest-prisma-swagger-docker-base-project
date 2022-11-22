import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class HardDeleteUserService {
    constructor(private prisma: PrismaService) {}

    async delete(id: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                id,
                deleted: true,
            },
        });

        if (!user) {
            throw new ForbiddenException(
                "This user does not exist or has not yet been hard delete",
            );
        }

        await this.prisma.user.delete({
            where: {
                id,
            },
        });
    }
}
