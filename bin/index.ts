import { Container } from '../src/shared/infrastructure/Container';
import { Kernel } from '../src/shared/infrastructure/Kernel';

const container = new Container();
const application = container.invoke().resolve<Kernel>('app');

application
  .start()
  .then(async () => {
    console.log(`Environment: ${process.env.NODE_ENV}`);
  })
  .catch((err: Error) => {
    console.log(err);
    process.exit(1);
  });
