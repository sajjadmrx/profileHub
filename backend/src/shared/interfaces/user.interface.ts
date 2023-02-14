import {Prisma, User as _User, Profile as _Profile} from "@prisma/client"

export interface User extends _User {
}

export interface UserProfile
    extends Omit<User, 'access_token' | 'providerId' | 'id'> {
}

export interface UserCreateInput
    extends Omit<Prisma.UserCreateInput, 'updatedAt'> {
}


export interface Profile extends _Profile {
}


export interface ProfileCreateInput extends Prisma.ProfileCreateInput {
}

export interface ProfileUpdateInput extends Prisma.ProfileUpdateInput {
}

export interface UserUpdateInput extends Prisma.UserUpdateInput {
}


export type UserId = number

