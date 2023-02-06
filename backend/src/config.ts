export interface Configs {
    PORT: number
    NODE_ENV: string
    REDIS_URL: string
}

export default (): Configs => ({
    PORT: Number(process.env["PORT"]),
    NODE_ENV: process.env.NODE_ENV,
    REDIS_URL: process.env.REDIS_URL
});
