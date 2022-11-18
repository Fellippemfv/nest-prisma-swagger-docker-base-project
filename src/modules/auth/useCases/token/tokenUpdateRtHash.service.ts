import { Injectable } from "@nestjs/common";
import * as argon from "argon2";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class AuthTokenUpdateRtHashService {
    constructor(private prisma: PrismaService) {}

    async updateRtHash(userId: string, rt: string): Promise<void> {
        const hash = await argon.hash(rt);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hash,
            },
        });
    }
}
