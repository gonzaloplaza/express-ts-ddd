FROM node:14-alpine AS ts-build

RUN mkdir -p /app

COPY package.json yarn.lock /app/

WORKDIR /app

# Install Node dependencies
RUN yarn install

# Copy source files
COPY ./src /app/src
COPY ./prisma /app/prisma
COPY ./bin /app/bin
COPY ./config /app/config
COPY tsconfig.json /app

# Generate local prisma client
RUN yarn prisma generate

# Build/transpile from ts to js
RUN yarn build

# Generate build container

FROM node:14-alpine

LABEL Maintainer="Gonzalo Plaza <gonzalo@verize.com>" \
      Description="Lightweight container with Node 14 based on Alpine Linux"

# Environment vars
ARG NODE_ENV=development
ENV NODE_CONFIG_STRICT_MODE=1
ENV NODE_ENV=$NODE_ENV
ENV APP_NAME=express-ts-ddd
ENV APP_LOG_LEVEL=debug
ENV COGNITO_USER_POOL=""
ENV COGNITO_CLIENT_ID=""
ENV COGNITO_REGION=""

ENV PORT=3000

# Install Alpine dependencies
RUN apk --no-cache add supervisor && \
    rm -rf /var/cache/apk/*

# Configure supervisord
COPY ./etc/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir -p /app /app/logs

WORKDIR /app

COPY package.json yarn.lock /app/

# Install production Node dependencies
RUN yarn install --production

# Copy nodels build from previous stage
COPY --from=ts-build /app/dist /app/

# Generate prisma client
COPY ./prisma /app/prisma
RUN yarn prisma generate && rm -rf /app/prisma

# Expose the port nginx is reachable on
EXPOSE ${PORT}

# Let supervisord start nginx && node js built app
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
