import {INestApplication} from "@nestjs/common";
import {PrismaService} from "../src/modules/prisma/prisma.service";
import {runAndGetAppFixture} from "./fixtures/startapp.fixture";
import {User} from "../src/shared/interfaces/user.interface";
import {createJwtFixture} from "./fixtures/createJwt.fixture";
import * as request from "supertest"

describe('UsersMeController /users/@me (E2E)', function () {
    let app: INestApplication;
    let prismaService: PrismaService;
    beforeAll(async () => {
        app = await runAndGetAppFixture()
        prismaService = app.get<PrismaService>(PrismaService)
    });
    let testUser: User
    beforeEach(async () => {
        testUser = await prismaService.user.create({
            data: {
                username: "test",
                email: "test@test.com",
            }
        })
        await prismaService.profile.create({
            data: {userId: testUser.id}
        })
    })

    it('should response 401', async () => {
        const response = await request(app.getHttpServer())
            .get("/users/@me")
        expect(response.statusCode).toBe(401);
    });

    describe('/ GET', function () {
        it('should return main profile', async function () {
            const token: string = await createJwtFixture(app, testUser.id)
            const response = await request(app.getHttpServer())
                .get("/users/@me")
                .set("Authorization", `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toMatchObject({
                avatars: null,
                userId: testUser.id,
                banner: null,
                user: {
                    username: testUser.username
                }
            })

        });
    });

    afterEach(async () => {
        await prismaService.user.delete({
            where: {id: testUser.id}
        })
    })

    afterAll(async () => {
        await app.close()
    })
});
