import { Container } from '../../src/shared/infrastructure/Container';
import { Server } from '../../src/shared/infrastructure/Server';

const container = new Container();
const server = container.invoke().resolve<Server>('server');
export const app = server.invoke();
