require('dotenv').config();
const util = require('util');
const app = require('express')();
const exec = util.promisify(require('child_process').exec);

const run = async (cmd) => {
  try {
    const { stdout, stderr } = await exec(cmd);
    return stderr || stdout;
  } catch (error) {
    return error;
  }
};

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
  app.listen(3000);
};

start();
