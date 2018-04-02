FROM node:8-alpine

MAINTAINER Gilles Perreymond <gperreymond@viadeoteam.com>

# Automatic arguments pass from circleCI
ARG CIRCLE_SHA1

# Declare some hardcode environment vars for the image
ENV CIRCLE_SHA1=$CIRCLE_SHA1

RUN apk add --update bash

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY . /usr/app

RUN npm install --production
RUN npm uninstall -g npm

# Start application
ENTRYPOINT ["./docker-entrypoint.sh"]

# Expose ports
EXPOSE 4000
