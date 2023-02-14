import {Injectable} from "@nestjs/common";
import {UsersRepository} from "../users.repository";
import {Profile, ProfileUpdateInput, UserId} from "src/shared/interfaces/user.interface";
import {removeScripts} from "src/shared/utils/security.util";

@Injectable()
export class UsersMeService {
    constructor(private usersRepo: UsersRepository) {
    }

    async getUserData(userId: UserId) {
        return this.usersRepo.getMainProfile(userId)
    }

    async getProfile(userId: UserId) {
        return this.usersRepo.findOneProfile(userId)
    }

    async updateProfile(input: ProfileUpdateInput, userId: UserId) {
        input.about = removeScripts(input.about as string || "")
        input.themeColor = removeScripts(input.themeColor as string || "")
        if (input.themeColor.startsWith("#"))
            input.themeColor = input.themeColor.replace("#", "").trimStart()
        return this.usersRepo.updateProfile(userId, input)
    }
}
