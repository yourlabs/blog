FROM node:alpine

COPY . /app
WORKDIR /app
RUN yarn && yarn build
RUN npx clean-css-cli -o themes/ybs/static/prism.css themes/ybs/static/prism.css
RUN npx clean-css-cli -o themes/ybs/static/fonts.css themes/ybs/static/fonts.css

FROM alpine
COPY . /app
COPY --from=0 /app/themes/ybs/static /app/themes/ybs/static
RUN apk update && apk add hugo
WORKDIR /app
RUN hugo
RUN gzip -k -6 $(find public -type f)

FROM nginx:alpine
COPY --from=1 /app/public /usr/share/nginx/html
RUN sed -i 's@^.*#error_page  404.* /404.html;@    error_page  404  /404.html;@g' /etc/nginx/conf.d/default.conf
