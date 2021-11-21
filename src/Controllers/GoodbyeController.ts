import * as express from 'express';
import { writeJsonResponse } from '../Utilities/Express';
 
export function goodbye(req: express.Request, res: express.Response): void
{
  const userId = res.locals.auth.userId;
  writeJsonResponse(res, 200, {"message": `Goodbye, ${userId}!`});
}
