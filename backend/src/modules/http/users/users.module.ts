import {Module} from '@nestjs/common';

import {UsersRepository} from './users.repository';
import {UsersController} from "./controllers/users.controller";
import {UsersMeController} from "./controllers/users-me.controller";
import {UsersMeService} from "./services/users-me.service";

const providersAndExports: any[] = [UsersRepository];

@Module({
    imports: [],
    controllers: [UsersController, UsersMeController],
    providers: [...providersAndExports, UsersMeService],
    exports: [...providersAndExports],
})
export class UserModule {
}
