import { Request, Response } from 'express';

export class IndexController {
  public invoke(req: Request, res: Response): Response {
    return res.json({});
  }
}
