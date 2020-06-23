FROM registry.gitlab.com/pages/hugo:latest
COPY . /app
WORKDIR /app
ARG HUGO_URL="https://blog.yourlabs.org"
RUN hugo --baseURL=$HUGO_URL
RUN gzip -k -6 $(find public -type f)

FROM nginx:alpine
COPY --from=0 /app/public /usr/share/nginx/html
RUN sed -i '/^.*#error*/s/^.*#/    /' /etc/nginx/conf.d/default.conf
