FROM node:11.9.0-alpine as builder
RUN apk update
RUN apk add --update bash

RUN apk add git

WORKDIR /tmp
ADD package.json /tmp/
ADD package-lock.json /tmp/

RUN npm install --no-save

ADD . /code/
WORKDIR /code
RUN cp -a /tmp/node_modules /code/node_modules
RUN npm run build


FROM node:11.9.0-alpine
RUN apk update
RUN apk add --update bash

WORKDIR /code
RUN npm install serve --no-save
COPY --from=builder /code/build /code/build

EXPOSE 8080
CMD ["serve", "-s", "build"]
