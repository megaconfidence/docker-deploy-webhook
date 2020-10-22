require('dotenv').config();
const util = require('util');
const app = require('express')();
const address = require('address');
const exec = util.promisify(require('child_process').exec);

const run = async (cmd) => {
  try {
    const { stdout, stderr } = await exec(cmd);
    return stderr || stdout;
  } catch (error) {
    return error;
  }
};

// Checks if webhook is online
app.get('/', (_, res) => {
  res.send({ isOnline: true });
});

// Deploys docker image
app.get('/deploy', async (req, res) => {
  const { key } = req.query;
  if (key === process.env.DEPLOY_KEY) {
    const out = await run('./deploy.sh');
    return res.send(out);
  }
  return res.status(401).end('invalid deploy key');
});

const start = async () => {
  await run('chmod +x ./deploy.sh');
  app.listen(process.env.PORT_WEBHOOK, () => {
    console.log(
      `🚀 WEBHOOK at http://${address.ip()}:${process.env.PORT_WEBHOOK}/`
    );
  });
};

start();
