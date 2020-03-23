FROM node:alpine
COPY . /app
WORKDIR /app
RUN yarn

FROM alpine
COPY . /app
COPY --from=0 /app/themes/ybs/static /app/themes/ybs/static
RUN apk update && apk add hugo
RUN cd /app && hugo --debug

FROM nginx:alpine
COPY --from=1 /app/public /usr/share/nginx/html
