FROM node:14-alpine

LABEL Maintainer="Gonzalo Plaza <gonzalo@verize.com>" \
      Description="Lightweight container with Nginx 1.16 & Node 14 based on Alpine Linux"

# Environment vars
ARG NODE_ENV=development
ENV NODE_CONFIG_STRICT_MODE=1
ENV NODE_ENV=$NODE_ENV
ENV APP_NAME=express-ts-ddd
ENV PORT=5000
ENV NGINX_PORT=8080

# Install Alpine dependencies
RUN apk --no-cache add nginx supervisor curl && \
    rm -rf /var/cache/apk/*

# Configure nginx
COPY ./etc/nginx/nginx.conf /etc/nginx/nginx.conf
# Remove default server definition
RUN rm /etc/nginx/conf.d/default.conf

# Configure supervisord
COPY ./etc/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir -p /app

COPY package.json yarn.lock /app/

WORKDIR /app

# Install Node dependencies
RUN yarn install

# Copy source files
COPY ./src /app/src
COPY ./bin /app/bin
COPY ./config /app/config
COPY tsconfig.json /app

# Build/transpile from ts to js
RUN yarn build

# Expose the port nginx is reachable on
EXPOSE ${NGINX_PORT}

# Let supervisord start nginx && node js built app
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]