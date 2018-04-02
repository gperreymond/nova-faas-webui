#!/bin/bash

docker load --input /tmp/images/${ECS_APP}.tar

docker push gperreymond/${ECS_APP}
