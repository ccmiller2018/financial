import express from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { Express } from 'express-serve-static-core';
import { connector, summarise } from 'swagger-routes-express';
import YAML from 'yamljs';

import * as api from '../Controllers';

export async function createServer(): Promise<Express>
{
    const YamlSpecFile = process.cwd() + '/config/openapi.yml';
    
    const apiDefinition = YAML.load(YamlSpecFile);
    const apiSummary = summarise(apiDefinition);

    const server = express();
    
    const validatorOptions = {
        apiSpec: YamlSpecFile,
        validateRequests: true,
        validateResponses: true,
    };

    server.use(OpenApiValidator.middleware(validatorOptions));

    server.use(
        (err: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
            response.status(err.status)
                .json(
                    {
                        error: {
                            type: 'request_validation',
                            message: err.message,
                            errors: err.errors
                        }
                    }
                );
        }
    );

    const connect = connector(
        api,
        apiDefinition,
        {
            onCreateRoute: (method: string, descriptor: any) => {
                console.log(`${method}: ${descriptor[0]} : ${(descriptor[1] as any).name}`);
            },
            security: {
                bearerAuth: api.auth
              }
        }
    );

    connect(server);

    return server;
}
