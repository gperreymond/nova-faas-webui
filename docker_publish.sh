#!/bin/bash

docker load --input /tmp/images/${ECS_APP}.tar

curl -u ${DOCKER_API_USERNAME}:${DOCKER_API_KEY} https://cloud.docker.com/api/app/v1/service/
docker push gperreymond/${ECS_APP}
