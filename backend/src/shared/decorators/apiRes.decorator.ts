import {ApiOperation, ApiResponse} from '@nestjs/swagger';

export function ApiRes(summary: string, example: any) {
    return (target, key, descriptor) => {
        ApiOperation({summary})(target, key, descriptor);
        if (example != null)
            ApiResponse({schema: {example}})(target, key, descriptor);
    };
}
