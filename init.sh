#!/bin/bash

docker build -t min-ts-express .
docker run --rm --name min-ts-express -p 3000:80 min-ts-express