# Express-TS-DDD REST API

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://www.typescriptlang.org/)
![GitHub Repo Size](https://img.shields.io/github/repo-size/gonzaloplaza/express-ts-ddd)
[![Github CI](https://github.com/gonzaloplaza/express-ts-ddd/workflows/ci/badge.svg)](https://github.com/gonzaloplaza/express-ts-ddd/actions)
[![codecov](https://codecov.io/gh/gonzaloplaza/express-ts-ddd/branch/master/graph/badge.svg?token=K1F7JAY6MF)](https://codecov.io/gh/gonzaloplaza/express-ts-ddd)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This is another Express + TypeScript + DDD (Domain Driven Design patterns) + IoC/DI (Inversion of
control and Dependency injection) + Primsa ORM + API REST boilerplate.

## Installation and Configuration

```bash
yarn install
yarn prisma generate
```

### Generate .env file

```bash
cp .env.dist .env
```

You have to configure local environment variables such as PostgreSQL connection string with your own
parameters inside _.env_ file. These are the default values:

```env
PORT=3000
APP_NAME="express-ts-ddd"

# Prisma supports the native connection string format for PostgreSQL, MySQL and SQLite.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

APP_DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
APP_LOG_LEVEL="debug"

COGNITO_USER_POOL="your_cognito_user_pool"
COGNITO_CLIENT_ID="your_cognito_client_id"
COGNITO_REGION="your-aws-region-x"

```

### Development with nodemon (Runs on 3000 port)

```bash
yarn dev
```

### Run tests and generate coverage report

```bash
yarn test
yarn coverage
```

### Build/Compile JS (to /dist folder)

```bash
yarn build
```

### Access Prisma Studio (Database preview for dev)

We are using [Prisma ORM](https://prisma.io) to handle database connections, migrations, code schema
management and also its studio web UI to preview database content in development environment. Please
check [Prisma documentation](https://www.prisma.io/docs/) for more detailed information.

```bash
yarn prisma studio
```

### Authentication with AWS Cognito

AWS Cognito is implemented as default authentication service. Please, check documentation on how to
configure it for more details: https://aws.amazon.com/cognito/getting-started/

---

### Docker Compose

This project is ready to work with **[docker-compose 3.8](https://docs.docker.com/compose/)** to
initalize the needed stack during development process. To start working run the following commands:

```bash
docker-compose build
docker-compose up
```

### Working docker compose environment (Port 8080)

```bash
curl http://localhost:8080
curl http://localhost:8080/health_check
```

Example JSON response (/health_check):

```json
{
  "id": "cd6f2876-5de5-4433-b0b9-fb7a8d47abbb",
  "success": true,
  "date": "2021-02-07T20:13:21.720Z"
}
```

### Build Docker image for production

You can build an optimized Docker production-ready image with the standard command:

```sh
docker build -t express-ts-ddd .
```

And then run the container passing environment variables within the initialization:

```sh
docker run --rm -it -p 3000:3000 \
  -e NODE_ENV=production \
  -e APP_DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public" \
  -e COGNITO_USER_POOL="your_cognito_user_pool" \
  -e COGNITO_CLIENT_ID="your_cognito_client_id" \
  -e COGNITO_REGION="your-aws-region-x" \
  --name express-ts-ddd express-ts-ddd
```

---

## Next steps

- [x] Adds Prisma ORM with PostgreSQL implementation
- [x] Adds Github CI + CI testings
- [ ] Adds better documentation
- [ ] Kubernetes support (Local environment microk8s, minikube...)
- [x] Docker for development (docker-compose) and production environments
- [x] Global logger service (Morgan + Winston)
- [x] Integration basic testing (supertest)
- [x] Authentication service with Cognito
- [x] Adds test coverage report, codecov integration
