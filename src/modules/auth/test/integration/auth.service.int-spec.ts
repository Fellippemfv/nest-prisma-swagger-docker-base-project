import { Test, TestingModule } from "@nestjs/testing";
import { User } from "@prisma/client";
import { decode } from "jsonwebtoken";
import { AppModule } from "src/app.module";
import { PrismaService } from "src/database/PrismaService";
import { Tokens } from "../../common/types";
import { AuthLogoutService } from "../../useCases/logout/logout.service";
import { AuthSigninService } from "../../useCases/signin/signin.service";
import { AuthSignupService } from "../../useCases/signup/signup.service";
import { AuthTokenRefreshService } from "../../useCases/token/tokenRefresh.service";

const user = {
    email: "test@gmail.com",
    password: "super-secret-password",
    name: "test name 1",
};

describe("Auth Flow", () => {
    let prisma: PrismaService;
    let authSignupService: AuthSignupService;
    let authSigninService: AuthSigninService;
    let authLogoutService: AuthLogoutService;
    let authTokenRefreshService: AuthTokenRefreshService;
    let moduleRef: TestingModule;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prisma = moduleRef.get(PrismaService);
        authSignupService = moduleRef.get(AuthSignupService);
        authSigninService = moduleRef.get(AuthSigninService);
        authLogoutService = moduleRef.get(AuthLogoutService);
        authTokenRefreshService = moduleRef.get(AuthTokenRefreshService);
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    describe("signup", () => {
        beforeAll(async () => {
            await prisma.cleanDatabase();
        });

        it("should signup", async () => {
            const tokens = await authSignupService.signupLocal({
                email: user.email,
                password: user.password,
                name: user.name,
            });

            expect(tokens.access_token).toBeTruthy();
            expect(tokens.refresh_token).toBeTruthy();
        });

        it("should throw on duplicate user signup", async () => {
            let tokens: Tokens | undefined;
            try {
                tokens = await authSignupService.signupLocal({
                    email: user.email,
                    password: user.password,
                    name: user.name,
                });
            } catch (error) {
                expect(error.status).toBe(403);
            }

            expect(tokens).toBeUndefined();
        });
    });

    describe("signin", () => {
        beforeAll(async () => {
            await prisma.cleanDatabase();
        });
        it("should throw if no existing user", async () => {
            let tokens: Tokens | undefined;
            try {
                tokens = await authSigninService.signinLocal({
                    email: user.email,
                    password: user.password,
                });
            } catch (error) {
                expect(error.status).toBe(403);
            }

            expect(tokens).toBeUndefined();
        });

        it("should login", async () => {
            await authSignupService.signupLocal({
                email: user.email,
                password: user.password,
                name: user.name,
            });

            const tokens = await authSigninService.signinLocal({
                email: user.email,
                password: user.password,
            });

            expect(tokens.access_token).toBeTruthy();
            expect(tokens.refresh_token).toBeTruthy();
        });

        it("should throw if password incorrect", async () => {
            let tokens: Tokens | undefined;
            try {
                tokens = await authSigninService.signinLocal({
                    email: user.email,
                    password: user.password + "a",
                });
            } catch (error) {
                expect(error.status).toBe(403);
            }

            expect(tokens).toBeUndefined();
        });

        it("should throw if email incorrect", async () => {
            let tokens: Tokens | undefined;
            try {
                tokens = await authSigninService.signinLocal({
                    email: user.email + "a",
                    password: user.password,
                });
            } catch (error) {
                expect(error.status).toBe(403);
            }

            expect(tokens).toBeUndefined();
        });
    });

    describe("logout", () => {
        beforeAll(async () => {
            await prisma.cleanDatabase();
        });

        it("should pass if call to non existent user", async () => {
            const result = await authLogoutService.logout("4");
            expect(result).toBeDefined();
        });

        it("should logout", async () => {
            await authSignupService.signupLocal({
                email: user.email,
                password: user.password,
                name: user.name,
            });

            let userFromDb: User | null;

            userFromDb = await prisma.user.findFirst({
                where: {
                    email: user.email,
                },
            });
            expect(userFromDb?.hashedRt).toBeTruthy();

            // logout
            await authLogoutService.logout(userFromDb?.id);

            userFromDb = await prisma.user.findFirst({
                where: {
                    email: user.email,
                },
            });

            expect(userFromDb?.hashedRt).toBeFalsy();
        });
    });

    describe("refresh", () => {
        beforeAll(async () => {
            await prisma.cleanDatabase();
        });

        it("should throw if no existing user", async () => {
            let tokens: Tokens | undefined;
            try {
                tokens = await authTokenRefreshService.refreshTokens("1", "");
            } catch (error) {
                expect(error.status).toBe(403);
            }

            expect(tokens).toBeUndefined();
        });

        it("should throw if user logged out", async () => {
            // signup and save refresh token
            const _tokens = await authSignupService.signupLocal({
                email: user.email,
                password: user.password,
                name: user.name,
            });

            const rt = _tokens.refresh_token;

            // get user id from refresh token
            // also possible to get using prisma like above
            // but since we have the rt already, why not just decoding it
            const decoded = decode(rt);
            const userId = String(decoded?.sub);

            // logout the user so the hashedRt is set to null
            await authLogoutService.logout(userId);

            let tokens: Tokens | undefined;
            try {
                tokens = await authTokenRefreshService.refreshTokens(
                    userId,
                    rt,
                );
            } catch (error) {
                expect(error.status).toBe(403);
            }

            expect(tokens).toBeUndefined();
        });

        it("should throw if refresh token incorrect", async () => {
            await prisma.cleanDatabase();

            const _tokens = await authSignupService.signupLocal({
                email: user.email,
                password: user.password,
                name: user.name,
            });

            const rt = _tokens.refresh_token;

            const decoded = decode(rt);
            const userId = String(decoded?.sub);

            let tokens: Tokens | undefined;
            try {
                tokens = await authTokenRefreshService.refreshTokens(
                    userId,
                    rt + "a",
                );
            } catch (error) {
                expect(error.status).toBe(403);
            }

            expect(tokens).toBeUndefined();
        });

        it("should refresh tokens", async () => {
            await prisma.cleanDatabase();
            // log in the user again and save rt + at
            const _tokens = await authSignupService.signupLocal({
                email: user.email,
                password: user.password,
                name: user.name,
            });

            const rt = _tokens.refresh_token;
            const at = _tokens.access_token;

            const decoded = decode(rt);
            const userId = String(decoded?.sub);

            // since jwt uses seconds signature we need to wait for 1 second to have new jwts
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 1000);
            });

            const tokens = await authTokenRefreshService.refreshTokens(
                userId,
                rt,
            );
            expect(tokens).toBeDefined();

            // refreshed tokens should be different
            expect(tokens.access_token).not.toBe(at);
            expect(tokens.refresh_token).not.toBe(rt);
        });
    });
});
