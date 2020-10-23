# Docker Deploy Webhook

This is a simple webhook that knows how to deploy docker images on a self managed host such as vm or your local computer with docker installed.

It is designed to work with a CI/CD flow either on travis, circle or git actions. After running your test etc, this webhook is to be called on the deploy stage of your pipeline and will auto deploy the docker image of the given repository on the host it is running on.

## Demo Video

[![Click here to see the demo video on youtube](https://img.youtube.com/vi/yNPahpRavCc/0.jpg)](https://youtu.be/yNPahpRavCc)

## Requirements

1. Linux/Unix host
2. Docker engine
3. Nodejs

## Environment Variables

This webhook requires the following environment variables

```
NODE_ENV=production

WEBHOOK_PORT=<prot-you-want-webhook-server-to-run>

DEPLOY_KEY=<security-key-sent-to-webhook-to-authorize-deploys>

PORT=<port-you-want-container-to-run-on>

REPO_URL=<git-repo-containing-info-to-build-your-image>

IMAGE_NAME=<name-you-want-to-call-your-image>

CONTAINER_NAME=<name-you-want-to-call-your-container>
```

Your can add other env variables that would be needed by the container at run-time to the `.env`

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

## Contributing

Your contributions are welcome. Please feel free to make suggestions and raise issues.
