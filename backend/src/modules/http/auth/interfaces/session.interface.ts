import {Prisma, Sessions} from "@prisma/client";

export interface Session extends Sessions {
}

export interface SessionCreateInput extends Omit<Prisma.SessionsCreateInput, "user"> {
    userId: number
}

export interface SessionUpdateInput extends Prisma.SessionsUpdateInput {
}
