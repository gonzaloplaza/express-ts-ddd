# Express-TS-DDD REST API

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
![GitHub Repo Size](https://img.shields.io/github/repo-size/gonzaloplaza/express-ts-ddd)
[![Github CI](https://github.com/gonzaloplaza/express-ts-ddd/workflows/ci/badge.svg)](https://github.com/gonzaloplaza/express-ts-ddd/actions)
[![Known Vulnerabilities](https://snyk.io/test/github/gonzaloplaza/express-ts-ddd/badge.svg)](https://snyk.io/test/gonzaloplaza/express-ts-ddd/{repo})
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This is another Express + TypeScript + DDD (Domain Driven Design patterns) + IoC/DI (Inversion of
control and Dependency injection) + API REST boilerplate.

### Install

```bash
yarn install
```

### Generate .env file

```bash
cp .env.dist .env
```

Configure PostgreSQL connection string with your own parameters inside _.env_ file:

```
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

### Development (Runs on 5000 port)

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

### Build Docker container

```bash
docker build --no-cache -t express-ts-ddd .
```

### Run container

```bash
docker run --rm -it -p 8080:8080 --name express-ts-ddd express-ts-ddd
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

Next steps:

- Adds Prisma ORM with PostgreSQL implementation
- Adds Github CI + CI testings
- Better documentation
- Improve Docker for production environments and development (docker-compose)
