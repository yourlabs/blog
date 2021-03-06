FROM registry.gitlab.com/pages/hugo:latest
COPY . /app
WORKDIR /app
ARG HUGO_URL="https://blog.yourlabs.org"
RUN sed -i "s@https://yourlabs.org@$HUGO_URL@g" config.toml
RUN sed -i "s@https://yourlabs.fr@http://fr.${HUGO_URL:7}@g" config.toml
RUN hugo --baseURL=$HUGO_URL
RUN gzip -k -6 $(find public -type f)

FROM nginx:alpine
COPY --from=0 /app/public /usr/share/nginx/html
RUN sed -i '/^.*#error*/s/^.*#/    /' /etc/nginx/conf.d/default.conf
RUN sed -i 's/index.html index.htm;/autoindex on;/g' /etc/nginx/conf.d/default.conf
COPY nginx-CI.conf /etc/nginx/conf.d/blog.conf
ARG HUGO_URL="https://blog.yourlabs.org"
RUN sed -i "s@EN_SERVER_NAME@${HUGO_URL:7}@g" /etc/nginx/conf.d/blog.conf
RUN sed -i "s@FR_SERVER_NAME@fr.${HUGO_URL:7}@g" /etc/nginx/conf.d/blog.conf
