import {INestApplication} from "@nestjs/common";
import * as request from 'supertest';
import {runAndGetAppFixture} from "./fixtures/startapp.fixture";
import {PrismaService} from "../src/modules/prisma/prisma.service"
import {JwtService} from "@nestjs/jwt";

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


});
