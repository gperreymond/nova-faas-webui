#!/bin/bash

docker load --input /tmp/images/${ECS_APP}.tar

docker login -u ${DOCKER_API_USERNAME} -p ${DOCKER_API_KEY}
docker push gperreymond/${ECS_APP}
