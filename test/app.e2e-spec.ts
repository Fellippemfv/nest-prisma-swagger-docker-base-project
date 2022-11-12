import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { useContainer } from "class-validator";
import { PrismaService } from "src/database/PrismaService";

describe("AppController (e2e)", () => {
    let app: INestApplication;
    let prisma: PrismaService;

    const usersData = [
        {
            id: "467050a0-d632-4f51-a5ac-ed843f3697eb",
            email: "User1@hotmail.com",
            name: "User 1",
            created_at: new Date("2022-11-01 21:01:43.215"),
            updated_at: new Date("2022-11-01 21:01:43.215"),
        },
        {
            id: "36455717-811c-4d81-8a81-d751bdfe4e30",
            email: "User2@hotmail.com",
            name: "User 2",
            created_at: new Date("2022-11-02 21:01:43.215"),
            updated_at: new Date("2022-11-02 21:01:43.215"),
        },
    ];

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        prisma = app.get<PrismaService>(PrismaService);

        useContainer(app.select(AppModule), { fallbackOnErrors: true });
        app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

        await app.init();

        await prisma.user.create({
            data: usersData[0],
        });
        await prisma.user.create({
            data: usersData[1],
        });
    });

    afterAll(async () => {
        const deleteUsers = prisma.user.deleteMany();

        await prisma.$transaction([deleteUsers]);

        await app.close();
    });

    describe("Get /users", () => {
        it("returns a list of all users", async () => {
            const { body } = await request(app.getHttpServer()).get("/users");
            expect(body).toHaveLength(2);
            expect(200);
        });
    });

    describe("Post /users", () => {
        it("create a user", async () => {
            await request(app.getHttpServer()).post("/users").send({
                name: "User Test1",
                email: "UserTest1@gmail.com",
            });
            expect(201);
        });
    });
});
