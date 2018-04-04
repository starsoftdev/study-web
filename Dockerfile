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

# Here we install GNU libc (aka glibc) and set C.UTF-8 locale as default.
# Required to build sentry-cli
RUN ALPINE_GLIBC_BASE_URL="https://github.com/sgerrand/alpine-pkg-glibc/releases/download" && \
    ALPINE_GLIBC_PACKAGE_VERSION="2.26-r0" && \
    ALPINE_GLIBC_BASE_PACKAGE_FILENAME="glibc-$ALPINE_GLIBC_PACKAGE_VERSION.apk" && \
    ALPINE_GLIBC_BIN_PACKAGE_FILENAME="glibc-bin-$ALPINE_GLIBC_PACKAGE_VERSION.apk" && \
    ALPINE_GLIBC_I18N_PACKAGE_FILENAME="glibc-i18n-$ALPINE_GLIBC_PACKAGE_VERSION.apk" && \
    apk add --no-cache --virtual=.build-dependencies wget ca-certificates && \
    wget \
        "https://raw.githubusercontent.com/sgerrand/alpine-pkg-glibc/master/sgerrand.rsa.pub" \
        -O "/etc/apk/keys/sgerrand.rsa.pub" && \
    wget \
        "$ALPINE_GLIBC_BASE_URL/$ALPINE_GLIBC_PACKAGE_VERSION/$ALPINE_GLIBC_BASE_PACKAGE_FILENAME" \
        "$ALPINE_GLIBC_BASE_URL/$ALPINE_GLIBC_PACKAGE_VERSION/$ALPINE_GLIBC_BIN_PACKAGE_FILENAME" \
        "$ALPINE_GLIBC_BASE_URL/$ALPINE_GLIBC_PACKAGE_VERSION/$ALPINE_GLIBC_I18N_PACKAGE_FILENAME" && \
    apk add --no-cache \
        "$ALPINE_GLIBC_BASE_PACKAGE_FILENAME" \
        "$ALPINE_GLIBC_BIN_PACKAGE_FILENAME" \
        "$ALPINE_GLIBC_I18N_PACKAGE_FILENAME" && \
    \
    rm "/etc/apk/keys/sgerrand.rsa.pub" && \
    /usr/glibc-compat/bin/localedef --force --inputfile POSIX --charmap UTF-8 "$LANG" || true && \
    echo "export LANG=$LANG" > /etc/profile.d/locale.sh && \
    \
    apk del glibc-i18n && \
    \
    rm "/root/.wget-hsts" && \
    apk del .build-dependencies && \
    rm \
        "$ALPINE_GLIBC_BASE_PACKAGE_FILENAME" \
        "$ALPINE_GLIBC_BIN_PACKAGE_FILENAME" \
        "$ALPINE_GLIBC_I18N_PACKAGE_FILENAME"
        

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
  && rm .env \
  && touch .env

ENTRYPOINT [ "/sbin/tini", "--" ]
ENV PORT=80
EXPOSE 80
CMD [ "chamber", "exec", "development", "--", "node", "server"]
