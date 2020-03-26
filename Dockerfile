FROM node:alpine

COPY . /app
WORKDIR /app
RUN yarn

FROM alpine
COPY . /app
COPY --from=0 /app/themes/ybs/static /app/themes/ybs/static
RUN apk update && apk add hugo
RUN cd /app && hugo && gzip -k -6 $(find public -type f)

FROM node:alpine
COPY . /app
WORKDIR /app
RUN npx clean-css-cli -o public/prism.css public/prism.css && \
    npx clean-css-cli -o public/fonts.css public/fonts.css

FROM nginx:alpine
COPY --from=1 /app/public /usr/share/nginx/html
