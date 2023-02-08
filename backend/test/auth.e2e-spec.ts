import {INestApplication} from "@nestjs/common";
import * as request from 'supertest';
import {runAndGetAppFixture} from "./fixtures/startapp.fixture";
import {PrismaService} from "../src/modules/prisma/prisma.service"
import {JwtService} from "@nestjs/jwt";
import {SessionRepository} from "../src/modules/http/auth/session.repository";

describe("AuthController (e2e)", () => {
    let app: INestApplication;
    let prismaService: PrismaService;
    let jwtService: JwtService
    beforeAll(async () => {
        app = await runAndGetAppFixture()
        prismaService = app.get<PrismaService>(PrismaService)
        jwtService = app.get<JwtService>(JwtService)
    });

    afterEach(() => {
        jest.clearAllMocks()
    })

    afterAll(() => {
        app.close()
    })

    describe('create/get jwt&refresh token with google OAuth2', function () {

        it('should response 400 when send invalid data', async function () {
            const response = await request(app.getHttpServer())
                .post("/auth/google")
                .send({badKey: "badValue"});

            expect(response.statusCode).toBe(400)
        });

        it('should response jwt & refresh token', async function () {
            jest.spyOn(jwtService, "decode") //mock decode google token
                .mockImplementation(() => {
                    return {
                        email: "fake@gmail.com",
                        email_verified: true,
                        name: "fakeUserGmail"
                    }
                })
            const response = await request(app.getHttpServer())
                .post("/auth/google")
                .send({token: "AA"});

            expect(response.statusCode).toBe(201)
            expect(typeof response.body.data.refresh).toBe("string")
        });

    });

    describe('refresh Token', function () {
        let sessionRepo: SessionRepository;
        beforeEach(() => {
            sessionRepo = app.get<SessionRepository>(SessionRepository)
        })
        it('should response http status 400 when refresh token is invalid', async function () {
            const response = await request(app.getHttpServer())
                .post("/auth/refresh")
                .send({
                    refresh: ""
                })
            expect(response.statusCode).toBe(400)
            expect(response.body.messages).toContain("REFRESH_TOKEN_IS_EMPTY")
        });
        it('should response http status 400 when refresh token is not found in database', async function () {
            const response = await request(app.getHttpServer())
                .post("/auth/refresh")
                .send({
                    refresh: "xxxxxxxxxxxxxxxxxxxxxx"
                })
            expect(response.statusCode).toBe(400)
            expect(response.body.messages).toContain("INVALID_REFRESH_TOKEN")
        });
        it('should response access token and new refresh token', async function () {
            const token: string = "297084ce-76b5-4d18-817f-95e86b446c68"
            jest.spyOn(sessionRepo, "findOneByRefreshToken")
                .mockImplementation(async (): Promise<any> => {
                    return {
                        id: 1,
                        userId: 3,
                        refresh: token,
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                    }
                })
            jest.spyOn(sessionRepo, "deleteOneByRefresh").mockImplementation()
            jest.spyOn(sessionRepo, "create").mockImplementation()
            const response = await request(app.getHttpServer())
                .post("/auth/refresh")
                .send({
                    refresh: token
                });
            expect(typeof response.body.data.refresh).toBe("string")
        });
    });

});
