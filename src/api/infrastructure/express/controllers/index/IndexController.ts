import { Request, Response } from 'express';

export class IndexController {
  public async invoke(req: Request, res: Response): Promise<Response> {
    return Promise.resolve(res.json({}));
  }
}
