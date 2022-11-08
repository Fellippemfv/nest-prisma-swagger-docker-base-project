import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { CreateUserDto } from "../../dto/create-user.dto";

@Injectable()
export class CreateUserService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto) {
        const userAlreadyExists = await this.prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = await this.prisma.user.create({
            data,
        });

        return user;
    }
}
