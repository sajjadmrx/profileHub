import {Module} from '@nestjs/common';

import {UsersRepository} from './users.repository';

const providersAndExports: any[] = [UsersRepository];

@Module({
    imports: [],
    controllers: [],
    providers: [...providersAndExports],
    exports: [...providersAndExports],
})
export class UserModule {
}
