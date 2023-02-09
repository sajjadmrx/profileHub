import {Injectable} from "@nestjs/common";
import {UsersRepository} from "../users.repository";
import {UserId} from "../../../../shared/interfaces/user.interface";

@Injectable()
export class UsersMeService {
    constructor(private usersRepo: UsersRepository) {
    }

    async getMainProfile(userId: UserId) {
        return this.usersRepo.getMainProfile(userId)
    }
}
