import {INestApplication} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const brandName: string = "ProfileHub";

export class DocumentConfig {
    constructor(
        private app: INestApplication
    ) {
    }

    setupSwagger(port: number, path: string): void {
        const config = new DocumentBuilder()
            .setTitle(brandName)
            .setDescription(`The ${brandName} API description`)
            .setVersion("1.0")
            .addBearerAuth({
                type: "http",
                scheme: "bearer",
                in: "header",
                name: "Authorization"
            })
            .build();

        const document = SwaggerModule.createDocument(this.app, config);
        SwaggerModule.setup(path, this.app, document);
    }
}
