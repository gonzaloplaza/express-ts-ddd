FROM nginx:1.17-alpine

LABEL Maintainer="Gonzalo Plaza <gonzalo@verize.com>" \
      Description="Lightweight container with Nginx 1.16 & Node 14 based on Alpine Linux"

ARG PORT=8080
ENV PORT=${PORT}

# Configure nginx
COPY ./etc/nginx/nginx.conf /etc/nginx/nginx.conf
# Remove default server definition
RUN rm /etc/nginx/conf.d/default.conf


EXPOSE ${PORT}
