#!/bin/bash
if $(docker images -a | grep -q $IMAGE_NAME); then
  docker rmi --force $IMAGE_NAME
  docker system prune --force
fi
docker build --tag $IMAGE_NAME $(for i in `cat .env`; do out+="--build-arg $i " ; done; echo $out;out="") $REPO_URL
if $(docker ps -a | grep -q $CONTAINER_NAME); then
  docker rm --force $CONTAINER_NAME
fi
docker run --detach --restart always --network=host --name $CONTAINER_NAME $IMAGE_NAME
