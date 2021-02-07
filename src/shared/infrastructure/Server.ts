import express, { Application, Router } from 'express';
import morgan from 'morgan';
import { AddressInfo } from 'net';
import CONFIG from '../../../config';

export class Server {
    private express: Application;

    constructor(private router: Router) {
        this.express = express();
        this.express.use(morgan('tiny'));
        this.express.use(router);
    }

    public async start(): Promise<void> {
        return new Promise<void>((resolve) => {
            const http = this.express.listen(CONFIG.PORT, () => {
                const { port } = http.address() as AddressInfo;
                console.log(`🚀 Application ${CONFIG.APP_NAME} running on PORT ${port}`);
                resolve();
            });
        });
    }
}
