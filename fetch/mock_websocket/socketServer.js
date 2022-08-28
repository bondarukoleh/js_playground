const {WebSocketServer} = require('ws')

console.log(`======================Socket server started======================================`)
console.log(`Open the file ${require('path').join(process.cwd() + 'index.html')} in a browser`)
console.log(`=================================================================================`)

const wss = new WebSocketServer({ port: 4000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received');
    console.log(JSON.parse(data));
    ws.send(JSON.stringify(JSON.parse(data)));
  });
});
