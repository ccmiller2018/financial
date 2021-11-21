import * as express from 'express';

export function hello(request: express.Request, response: express.Response): express.Response
{
    const name = request.query.name || 'stranger';
    const message = `Hello, ${name}`;

    return response.json(
        {
            message: message,
        }
    );
}
