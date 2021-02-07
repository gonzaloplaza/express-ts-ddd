# Express-TS-DDD REST API

Install:

```
yarn install
```

Generate .env file:

```
cp .env.dist .env
```

Development (Runs on 5000 port):

```
yarn dev
```

Run tests and generate coverage report:

```
yarn test
yarn coverage
```

Build/Compile from TS to JS:

```
yarn build
```

Build Docker container

```
docker build --no-cache -t express-ts-ddd .
```

Run container:

```
docker run --rm -it -p 8080:8080 --name express-ts-ddd express-ts-ddd
```

Test endpoint (Port 8080):

```
curl http://localhost:8080
curl http://localhost:8080/health_check
```
