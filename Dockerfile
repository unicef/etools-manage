FROM node:10-alpine
RUN apk update

RUN apk add --update bash
RUN apk add git

RUN npm i -g npm

WORKDIR /tmp
ADD package.json /tmp/

RUN npm install
RUN mkdir /code/
ADD . /code/

RUN rm -rf /code/dist/

WORKDIR /code
RUN cp -a /tmp/node_modules /code/node_modules

RUN npm run build
EXPOSE 8080
CMD ["node", "server.js"]
