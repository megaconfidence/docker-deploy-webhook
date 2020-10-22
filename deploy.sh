#!/bin/bash
if $(docker images -a | grep -q $IMAGE_NAME); then
  docker rmi -f $IMAGE_NAME
  docker system prune -f
fi
docker build --tag $IMAGE_NAME $REPO_URL
if $(docker ps -a | grep -q $CONTAINER_NAME); then
  docker stop $CONTAINER_NAME
fi
docker run -dit --rm -p $PORT:$PORT --env-file .env --name $CONTAINER_NAME $IMAGE_NAME
