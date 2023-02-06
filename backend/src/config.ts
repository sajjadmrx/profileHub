import {AppMode} from "./shared/constants/app-mode.constant";

export interface Configs {
    PORT: number
    NODE_ENV: AppMode
    REDIS_URL: string
}

export default (): Configs => ({
    PORT: Number(process.env["PORT"]),
    NODE_ENV: process.env.NODE_ENV as any,
    REDIS_URL: process.env.REDIS_URL
});
