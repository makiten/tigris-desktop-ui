FROM jogral/base:latest

MAINTAINER Jogral <code@jogral.io>

WORKDIR /opt/app

COPY package.json /opt/app

RUN npm install

COPY . /opt/app

EXPOSE 8080

CMD /bin/sh
