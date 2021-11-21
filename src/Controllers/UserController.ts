import * as express from 'express';

import AuthenticationService from '../Services/Authentication';
import { writeJsonResponse } from '../Utilities/Express';

export function auth(request: express.Request, response: express.Response, next: express.NextFunction): void
{
    const token = request.headers.authorization!
    AuthenticationService.auth(token)
        .then(authResponse => {
            if (!(authResponse as any).error) {
                response.locals.auth = {
                    userId: (authResponse as {userId: string}).userId
                }
                next()
            } else {
                writeJsonResponse(response, 401, authResponse)
            }
        }
    )
    .catch(err => {
        writeJsonResponse(response, 500, {error: {type: 'internal_server_error', message: 'Internal Server Error'}})
    });
}