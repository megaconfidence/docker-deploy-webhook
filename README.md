# Docker Deploy Webhook

This is a simple webhook that auto deploys docker images on a self managed host such as VM or your local computer with docker installed

It is designed to work with a CI/CD flow either on travis, circle or git actions. After running your test etc, this webhook is to be called on the deploy stage of your pipeline and will auto deploy the docker image of the given repository on the host it is running on

## Demo Video
See how this webhook works by playing the video below

[![Click here to see the demo video on youtube](https://img.youtube.com/vi/yNPahpRavCc/0.jpg)](https://youtu.be/yNPahpRavCc)

## Requirements

1. Linux/Unix host i.e [Ubuntu](https://ubuntu.com/download/server)
2. [Docker engine](https://docs.docker.com/engine/install/)
3. [Nodejs](https://nodejs.org/en/download/package-manager/)
4. [PM2](https://pm2.keymetrics.io/)

## Environment Variables

This webhook requires the following environment variables

```

WEBHOOK_PORT=<port-you-want-webhook-server-to-run>

DEPLOY_KEY=<security-key-sent-to-webhook-to-authorize-deploys>

REPO_URL=<git-repo-containing-info-to-build-your-image>

IMAGE_NAME=<name-you-want-to-call-your-image>

CONTAINER_NAME=<name-you-want-to-call-your-container>
```

Your can add other env variables that would be needed by the container at run-time to the `.env` file. These variables would be used to build the image, making them available when the container restarts (make sure you have your `ARG`s and `ENV`s properly setup in your `Dockerfile`)

## Scripts

This webhook runs on a Nodejs server managed by PM2. The available scripts are:

### Start

Starts the server in a daemonized process

```
yarn start
```

### Stop

Kills the server process

```
yarn stop
```

### Dev

Starts the server in development mode

```
yarn dev
```
### Startup
If you want the webhook to automatically start on boot
```
npm i -g pm2
yarn start
pm2 startup
```

## Contributing

Your contributions are welcome. Please feel free to make suggestions and raise issues
