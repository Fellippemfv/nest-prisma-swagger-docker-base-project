import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class ListUsersAllDeletedService {
    constructor(private prisma: PrismaService) {}

    async findAllDeleted() {
        return this.prisma.user.findMany({
            where: {
                deleted: true,
            },
        });
    }
}
