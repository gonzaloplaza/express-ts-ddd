import { Container } from '../src/shared/infrastructure/Container';
import { Kernel } from '../src/shared/infrastructure/Kernel';
import { Configuration } from '../config';

const container = new Container();
const application = container.invoke().resolve<Kernel>('app');
const config = container.invoke().resolve<Configuration>('config');

application
  .start()
  .then(async () => {
    console.log(`Environment: ${config.NODE_ENV}`);
  })
  .catch((err: Error) => {
    console.log(err);
    process.exit(1);
  });
