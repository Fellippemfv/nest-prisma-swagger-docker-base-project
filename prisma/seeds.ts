import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function AddUserToDatabase() {
    const addUserOne = await prisma.user.upsert({
        where: { id: "cafa03b5-d2b5-47dd-a59f-173b2edecd14" },
        update: {},
        create: {
            id: "cafa03b5-d2b5-47dd-a59f-173b2edecd14",
            email: "User1@hotmail.com",
            name: "User 1",
            created_at: new Date("2022-11-01 21:01:43.215"),
            updated_at: new Date("2022-11-01 21:01:43.215"),
        },
    });

    const addUserTwo = await prisma.user.upsert({
        where: { id: "e9f032cc-2d1c-4d17-b12a-12c97f017396" },
        update: {},
        create: {
            id: "e9f032cc-2d1c-4d17-b12a-12c97f017396",
            email: "User2@hotmail.com",
            name: "User 2",
            created_at: new Date("2022-11-02 21:01:43.215"),
            updated_at: new Date("2022-11-02 21:01:43.215"),
        },
    });

    const addUserThree = await prisma.user.upsert({
        where: { id: "1e1d6279-c81c-49c2-b3d7-cbe5468b3f90" },
        update: {},
        create: {
            id: "1e1d6279-c81c-49c2-b3d7-cbe5468b3f90",
            email: "User3@hotmail.com",
            name: "User 3",
            created_at: new Date("2022-11-03 21:01:43.215"),
            updated_at: new Date("2022-11-03 21:01:43.215"),
        },
    });

    const addUserFour = await prisma.user.upsert({
        where: { id: "0c15fd15-bc1b-4874-abf4-76438ed60db8" },
        update: {},
        create: {
            id: "0c15fd15-bc1b-4874-abf4-76438ed60db8",
            email: "User4@hotmail.com",
            name: "User 4",
            created_at: new Date("2022-11-04 21:01:43.215"),
            updated_at: new Date("2022-11-04 21:01:43.215"),
        },
    });

    const addUserFive = await prisma.user.upsert({
        where: { id: "8a0fefac-c081-4d47-8652-c1c0bb1c6207" },
        update: {},
        create: {
            id: "8a0fefac-c081-4d47-8652-c1c0bb1c6207",
            email: "User5@hotmail.com",
            name: "User 5",
            created_at: new Date("2022-11-05 21:01:43.215"),
            updated_at: new Date("2022-11-05 21:01:43.215"),
        },
    });

    console.log({
        addUserOne,
        addUserTwo,
        addUserThree,
        addUserFour,
        addUserFive,
    });
}

AddUserToDatabase()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
