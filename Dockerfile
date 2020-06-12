FROM node:alpine

COPY . /app
WORKDIR /app
RUN apk update && apk add python2 make g++
RUN yarn && yarn build
RUN npx clean-css-cli -o static/prism.css static/prism.css
RUN npx clean-css-cli -o static/fonts.css static/fonts.css

FROM registry.gitlab.com/pages/hugo:latest
COPY . /app
COPY --from=0 /app/static static
WORKDIR /app
ARG HUGO_URL="https://blog.yourlabs.org"
RUN hugo --baseURL=$HUGO_URL
RUN gzip -k -6 $(find public -type f)

FROM nginx:alpine
COPY --from=1 /app/public /usr/share/nginx/html
RUN sed -i '/^.*#error*/s/^.*#/    /' /etc/nginx/conf.d/default.conf
