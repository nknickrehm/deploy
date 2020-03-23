# Automated code deployment with GitHub webhooks
This minimalistic web application can be operated on a server hosting another Node.js application to add a very lightweight continuous deployment setup.

## Prerequisites
- Your main Node.js application needs to be connected to a GitHub repository and be operated through [PM2](https://pm2.keymetrics.io)
- Node.js ~12.16.1
- PM2 installed globally (`npm i -g pm2`)

## Usage
- Clone the repository on your server
- Copy `.env.example` to `.env`
- In the .env file set
  - MAIN_REPO to the full path to the directory containing your application
  - MAIN_PM2 to the name of your application in PM2
  - GITHUB_SECRET to a strong secret which is used to authenticate webhook requests from GitHub (choose wisely 👀)
- Execute `pm2 start ecosystem.config.js`
- Verify that the server is running `pm2 list`
- Setup PM2 to start up your server after reboot (you propably have this enabled for your main application as well) `pm2 startup` and `pm2 save`
- Setup a new webhook on the project setting page of your GitHub repository
  - Payload URL: http://your-server.com:8080
  - Content type: application/json
  - Secret: The secret you chose earlier
  - Which events would you like to trigger this webhook?: Just the push event
  
  This should do the trick 🚀
  Please open an issue if you encounter a problem or send me an email.
