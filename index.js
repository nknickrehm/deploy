const http = require('http');
const crypto = require('crypto');
const path = require('path');
const { spawn } = require('child_process');

require('dotenv').config()

const secret = process.env.GITHUB_SECRET;
const mainRepo = process.env.MAIN_REPO;
const mainPM2 = process.env.MAIN_PM2;

http.createServer((req, res) => {
  req.on('data', (chunk) => {
    const sig = `sha1=${crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex')}`;
    console.log('New incoming request');
    console.log(req.headers['x-hub-signature']);
    console.log(sig);
    if (req.headers['x-hub-signature'] === sig) {
      console.log('Valid request from GitHub');
      const p = spawn('/bin/bash', ['./deploy.sh', mainRepo, mainPM2]);
      p.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      p.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      p.on('exit', (code) => {
        console.log(`Child process exited with code ${code.toString()}`);
      });
    }
  });

  res.end();
}).listen(8080); // or any other port you like. make sure to update your firewall rules

