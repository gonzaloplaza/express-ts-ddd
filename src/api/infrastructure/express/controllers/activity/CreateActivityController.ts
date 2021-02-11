import { Request, Response } from 'express';

export class CreateActivityController {
    public async invoke(req: Request, res: Response): Promise<Response> {
        return res.json({});
    }
}
