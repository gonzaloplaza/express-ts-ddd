# Express-TS-DDD REST API

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
![GitHub Repo Size](https://img.shields.io/github/repo-size/gonzaloplaza/express-ts-ddd)
[![Github CI](https://github.com/gonzaloplaza/express-ts-ddd/workflows/ci/badge.svg)](https://github.com/gonzaloplaza/express-ts-ddd/actions)
[![Known Vulnerabilities](https://snyk.io/test/github/gonzaloplaza/express-ts-ddd/badge.svg)](https://snyk.io/test/github/gonzaloplaza/express-ts-ddd)
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

## Docker Compose

This project is ready to work with **[docker-compose 3.8](https://docs.docker.com/compose/)** to
initalize the needed stack during development process. To start working run the following commands:

```bash
docker-compose build
docker-compose up
```

### Working container endpoint (Port 8080)

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

---

## Next steps

- [x] Adds Prisma ORM with PostgreSQL implementation
- [x] Adds Github CI + CI testings
- [ ] Adds better documentation
- [x] Docker for development (docker-compose) and production environments
- [ ] Global logger service (Winston)
- [ ] Authentication service/endppoint
- [ ] End2End testing (supertest)
