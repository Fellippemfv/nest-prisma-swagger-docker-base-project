import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { PrismaService } from "src/database/PrismaService";
import { AuthSignupService } from "src/modules/auth/useCases/signup/signup.service";
import { ListUsersAllService } from "../../useCases/listUsersAll/listUsersAll.service";

const user = {
    email: "test2@gmail.com",
    password: "super-secret-password2",
    name: "test name 2",
};

describe("Dashboard Flow", () => {
    let prisma: PrismaService;
    let listUsersAllService: ListUsersAllService;
    let authSignupService: AuthSignupService;
    let moduleRef: TestingModule;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prisma = moduleRef.get(PrismaService);
        listUsersAllService = moduleRef.get(ListUsersAllService);
        authSignupService = moduleRef.get(AuthSignupService);
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    describe("Users", () => {
        beforeAll(async () => {
            await prisma.cleanDatabase();
        });

        it("should show all registered users", async () => {
            await authSignupService.signupLocal({
                email: user.email,
                password: user.password,
                name: user.name,
            });

            const allUsers = await listUsersAllService.findAll();

            expect(200);
            expect(allUsers).toBeDefined();
        });
    });
});
