# Telegram TypeScript client

[The app](https://github.com/borovoff/telegram-typescript) is based on [TDLib](https://github.com/tdlib/td). Try the client [here](https://borovoff.github.io/telegram-client/).

### Prerequisites (Node.js)

MacOS
```
brew install node
```

Ubuntu
```
sudo apt install nodejs
```

### Deployment

```
npm install && npm run deploy
```

Script creates the "dist" folder. Copy all files from there to your server. 

### Development

```
npm install && npm run deploy && npm run start
```
 
The third part runs webpack on localhost:8080
