# Etools Manage

## Introduction

A portal to allow users to manage the Section entity of Etools.

### Features

Ability to add, remove, split and merge sections.

Details can be found in the gitbook.

## Installation

Since this is a module of Etools, you must include an entry in your `etools-infra` repo's `docker-compose.dev.yml`:

Add a `manage` service in the proxy:

    proxy:
        depends_on:
        - backend
        - manage

then the service itself

        manage:
            build:
            context: ./manage
            dockerfile: ./Dockerfile-dev
            image: etoolsdev/etools-manage:dev
            container_name: etoolsinfra_manage
            volumes:
            - "./manage:/code"
            ports:
            - 8080:8080
            command: ${FE_COMMAND:-sh -c "npm start"}

then finally inside the `proxy` dir edit the `nginx.config` file:

    server {
    listen      80;
    server_name 127.0.0.1;

    location /manage/ {
      proxy_pass http://manage:8080/;
    }

    ...rest of entries

Make sure to remove the image `etoolsdev/etools-proxy:dev` before running `fab devup` once you complete the above steps.
