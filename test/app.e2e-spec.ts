import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { PrismaService } from "src/database/PrismaService";
import { Tokens } from "src/modules/auth/common/types";
import { AuthDto } from "src/modules/auth/dto";

describe("AppController (e2e)", () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        prisma = app.get<PrismaService>(PrismaService);
        await prisma.cleanDatabase();
    });

    afterAll(async () => {
        await app.close();
    });

    describe("Auth", () => {
        const data: AuthDto = {
            email: "test@gmail.com",
            password: "super-secret-password",
            name: "test name",
        };

        let tokens: Tokens;

        it("should signup", () => {
            return request(app.getHttpServer())
                .post("/auth/local/signup")
                .send(data)
                .expect(201)
                .expect(({ body }: { body: Tokens }) => {
                    expect(body.access_token).toBeTruthy();
                    expect(body.refresh_token).toBeTruthy();
                });
        });
        it("should signin", () => {
            return request(app.getHttpServer())
                .post("/auth/local/signin")
                .send(data)
                .expect(200)
                .expect(({ body }: { body: Tokens }) => {
                    expect(body.access_token).toBeTruthy();
                    expect(body.refresh_token).toBeTruthy();
                    tokens = body;
                });
        });

        it("should refresh tokens", async () => {
            // wait for 1 second
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 1000);
            });

            return request(app.getHttpServer())
                .post("/auth/refresh")
                .auth(tokens.refresh_token, {
                    type: "bearer",
                })
                .expect(200)
                .expect(({ body }: { body: Tokens }) => {
                    expect(body.access_token).toBeTruthy();
                    expect(body.refresh_token).toBeTruthy();

                    expect(body.refresh_token).not.toBe(tokens.access_token);
                    expect(body.refresh_token).not.toBe(tokens.refresh_token);
                });
        });

        it("should logout", () => {
            return request(app.getHttpServer())
                .post("/auth/logout")
                .auth(tokens.access_token, {
                    type: "bearer",
                })
                .expect(200);
        });
    });
});
