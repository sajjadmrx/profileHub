export enum Messages {
    INVALID_LINK = "INVALID_LINK",
    SERVER_ERROR = "SERVER_ERROR",
    OK = "OK",
    FILE_NOT_FOUND = "FILE_NOT_FOUND",
    FILE_TO_LARGE = "FILE_TO_LARGE",
    NOTFOUND = "NOTFOUND",
    IS_PROCESSING = "IS_PROCESSING",
    INVALID_FORMAT = "INVALID_FORMAT",
    UNAUTHORIZED = "UNAUTHORIZED",
    LIMIT = "LIMIT"
}

export function getResponseMessage(message: keyof typeof Messages): string {
    return Messages[message];
}
