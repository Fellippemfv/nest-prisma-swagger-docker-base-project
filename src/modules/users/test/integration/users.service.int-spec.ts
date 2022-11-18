import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { PrismaService } from "src/database/PrismaService";
import { AuthSignupService } from "src/modules/auth/useCases/signup/signup.service";
import { ListAllUsersService } from "../../useCases/listAllUsers/listAllUsers.service";

const user = {
    email: "test2@gmail.com",
    password: "super-secret-password2",
};

//ajeitar testes de usuarios
describe("Dashboard Flow", () => {
    let prisma: PrismaService;
    let listAllUsersService: ListAllUsersService;
    let authSignupService: AuthSignupService;
    let moduleRef: TestingModule;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prisma = moduleRef.get(PrismaService);
        listAllUsersService = moduleRef.get(ListAllUsersService);
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
            });

            const allUsers = await listAllUsersService.findAll();

            expect(200);
            expect(allUsers).toBeDefined();
        });
    });
});
