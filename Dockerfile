# Set up builds for node
FROM node:8-alpine AS build-env
MAINTAINER Jogral <code@jogral.io>

WORKDIR /opt/app
COPY . /opt/app

RUN npm install -g quasar-cli
RUN npm install
RUN quasar build

# Run the actual app
FROM nginx:alpine

WORKDIR /tigris

COPY --from=build-env /opt/app/nginx/tigris.conf /etc/nginx/conf.d/default.conf
COPY --from=build-env /opt/app/dist/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
