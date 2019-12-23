

FROM node:11.9.0-alpine as builder

WORKDIR /code
ADD . /code
RUN npm install --silent
RUN npm run build

FROM node:11.9.0-alpine
RUN apk update && \
    apk add --update bash

WORKDIR /code
RUN npm install express --no-save
COPY --from=builder /code/server.js /code/server.js
COPY --from=builder /code/build /code/build
EXPOSE 8080
CMD ["node", "server.js"]





