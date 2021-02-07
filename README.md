# Express-TS-DDD REST API

This is another Express + TypeScript + DDD (Domain Driven Design patterns) + IoC/DI (Inversion of
control and Dependency injection) + API REST boilerplate.

### Install:

```
yarn install
```

### Generate .env file:

```
cp .env.dist .env
```

### Development (Runs on 5000 port):

```
yarn dev
```

### Run tests and generate coverage report:

```
yarn test
yarn coverage
```

### Build/Compile JS (to /dist folder):

```
yarn build
```

### Build Docker container

```
docker build --no-cache -t express-ts-ddd .
```

### Run container:

```
docker run --rm -it -p 8080:8080 --name express-ts-ddd express-ts-ddd
```

### Working container endpoint (Port 8080):

```
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

-   Adds Prisma ORM with PostgreSQL implementation
-   Adds Github CI + CI testings
-   Better documentation
-   Improve Docker for production environments and development (docker-compose)
