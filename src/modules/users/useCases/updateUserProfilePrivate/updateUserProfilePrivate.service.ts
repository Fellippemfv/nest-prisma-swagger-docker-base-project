import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { UpdateUserDto } from "../../dto/update-user.dto";

@Injectable()
export class UpdateUserProfilePrivateService {
    constructor(private prisma: PrismaService) {}

    async findOne(userId: string, data: UpdateUserDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: userId,
                deleted: false,
            },
        });

        if (!user) {
            throw new ForbiddenException(
                "This user does not exist or has been soft delete / hard delete",
            );
        }

        if (
            data.name === user.name ||
            data.email === user.email ||
            data.about === user.about
        ) {
            throw new BadRequestException(
                "You cannot update a field that is exactly the same as the old one.",
            );
        }

        const userUpdated = await this.prisma.user.update({
            data,
            where: {
                id: userId,
            },
        });

        const { email, name, about, updatedAt } = userUpdated;

        return { email, name, about, updatedAt };
    }
}
