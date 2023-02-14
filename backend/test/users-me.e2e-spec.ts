import {INestApplication} from "@nestjs/common";
import {PrismaService} from "../src/modules/prisma/prisma.service";
import {runAndGetAppFixture} from "./fixtures/startapp.fixture";
import {Profile, User} from "../src/shared/interfaces/user.interface";
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
    let testUserProfile: Profile
    let token: string;
    beforeEach(async () => {
        testUser = await prismaService.user.create({
            data: {
                username: "test",
                email: "test@test.com",
            }
        })
        testUserProfile = await prismaService.profile.create({
            data: {userId: testUser.id}
        })
        token = await createJwtFixture(app, testUser.id)
    })

    it('should response 401', async () => {
        const response = await request(app.getHttpServer())
            .get("/users/@me")
        expect(response.statusCode).toBe(401);
    });

    describe('/ GET', function () {
        it('should return main profile', async function () {
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

    describe('/profile', function () {
        it('should response user profile', async function () {
            const response = await request(app.getHttpServer())
                .get("/users/@me/profile")
                .set("Authorization", `Bearer ${token}`);
            delete response.body.data.updatedAt
            delete testUserProfile.updatedAt
            expect(response.body.data).toMatchObject(testUserProfile)
        });

        describe("/profile PATCH", function () {
            it('should update user profile', async function () {
                const birthday = new Date().toISOString()
                const response = await request(app.getHttpServer())
                    .patch("/users/@me/profile")
                    .set("Authorization", `Bearer ${token}`)
                    .send({
                        about: "test",
                        birthday: birthday,
                        themeColor: "#ffff1"
                    });
                expect(response.body.data.themeColor).toBe("ffff1")
                expect(response.body.data.about).toBe("test");

            });
            it('should response 400 when send invalid data', async function () {
                const response = await request(app.getHttpServer())
                    .patch("/users/@me/profile")
                    .set("Authorization", `Bearer ${token}`)
                    .send({
                        about: "test",
                        birthday: 123,
                        themeColor: "#ffff1"
                    });
                expect(response.statusCode).toBe(400)
                expect(response.body.messages).toContain("IS_STRING")
            });
            it('should save about without scripts', async function () {
                const birthday = new Date().toISOString()
                const response = await request(app.getHttpServer())
                    .patch("/users/@me/profile")
                    .set("Authorization", `Bearer ${token}`)
                    .send({
                        about: `<script>alert("injection")</script> test`,
                        birthday: birthday,
                        themeColor: "#ffff1"
                    });
                expect(response.body.data.about).toBe("test")
            });
        })

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
