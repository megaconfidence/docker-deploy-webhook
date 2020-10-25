#!/bin/bash
if $(docker images -a | grep -q $IMAGE_NAME); then
  docker rmi -f $IMAGE_NAME
  docker system prune -f
fi
docker build --tag $IMAGE_NAME $(for i in `cat .env`; do out+="--build-arg $i " ; done; echo $out;out="") $REPO_URL
if $(docker ps -a | grep -q $CONTAINER_NAME); then
  docker stop $CONTAINER_NAME
fi
docker run -d --restart always -p $PORT:$PORT --name $CONTAINER_NAME $IMAGE_NAME
