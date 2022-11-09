import { NotFoundException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class ListOneUserByIdService {
    constructor(private prisma: PrismaService) {}

    async findOne(id: string) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!userExists) {
            throw new NotFoundException("User does not exists!");
        }

        return userExists;
    }
}
