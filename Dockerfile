## Build container
FROM node:carbon-alpine AS buildstep

## Required for Alpine image and current `npm install`
RUN apk add --no-cache --virtual .build-deps \
  build-base \
  gcc \
  git \
  autoconf \
  automake \
  nasm \
  libpng-dev \
  lcms2-dev \
  bash
#  python && \
#  apk add vips-dev fftw-dev --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --only=production \
  && apk del .build-deps

## Runtime container
FROM node:carbon-alpine

RUN apk add --no-cache \
  lcms2 \
  libpng \
  tini

# Chamber gets the env variables from AWS Parameter Store
RUN apk add --no-cache openssl ca-certificates && \
wget https://github.com/segmentio/chamber/releases/download/v1.16.0/chamber-v1.16.0-linux-amd64 -O /sbin/chamber && \
  chmod +x /sbin/chamber
  
WORKDIR /usr/src/app

COPY --from=buildstep /usr/src/app/node_modules node_modules
COPY . .

RUN npm run build \
  && rm .env

ENTRYPOINT [ "/sbin/tini", "--" ]
ENV PORT=80
EXPOSE 80
CMD [ "chamber", "exec", "development", "--", "node", "server"]
