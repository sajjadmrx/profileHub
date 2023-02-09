import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import {AuthGuard as _AuthGuard} from "@nestjs/passport";
import {getResponseMessage} from "../constants/messages.constant";

@Injectable()
export class AuthGuard extends _AuthGuard("jwt") {
    constructor() {
        super();
    }

    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || (!user)) {
            throw err || new UnauthorizedException(getResponseMessage("UNAUTHORIZED"));
        }
        return user
    }
}

export function authGuard() {
    return new AuthGuard();
}
