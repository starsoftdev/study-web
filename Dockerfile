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
  libpng
  
WORKDIR /usr/src/app

COPY --from=buildstep /usr/src/app/node_modules node_modules
COPY . .

RUN npm run build
