#!/bin/bash
cd $1
git stash
git pull
pm2 stop $2
npm i
pm2 start ecosystem.config.js --env production