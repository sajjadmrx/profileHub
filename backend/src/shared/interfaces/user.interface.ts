import {Prisma, User as _User} from "@prisma/client"

export interface User extends _User {
}

export interface UserProfile
    extends Omit<User, 'access_token' | 'providerId' | 'id'> {
}

export interface UserCreateInput
    extends Omit<Prisma.UserCreateInput, 'updatedAt'> {
}

export interface ProfileCreateInput extends Prisma.ProfileCreateInput {
}

export interface UserUpdateInput extends Prisma.UserUpdateInput {
}


export type UserId = number

