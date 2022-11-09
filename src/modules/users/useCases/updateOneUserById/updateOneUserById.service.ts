import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { UpdateUserDto } from "../../dto/update-user.dto";

@Injectable()
export class UpdatedUserByIdService {
    constructor(private prisma: PrismaService) {}

    async update(id: string, data: UpdateUserDto) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!userExists) {
            throw new NotFoundException("User does not exists!");
        }

        return await this.prisma.user.update({
            data,
            where: {
                id,
            },
        });
    }
}
