import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class DeletedUserByIdService {
    constructor(private prisma: PrismaService) {}

    async delete(id: string) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!userExists) {
            throw new NotFoundException("User does not exists!");
        }

        return await this.prisma.user.delete({
            where: {
                id,
            },
        });
    }
}
