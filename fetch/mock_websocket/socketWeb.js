const ws = new window.WebSocket('ws://localhost:4000');

// Usage
// After a websocket connection has been created:
window._websockets[0].hooks = {
  // Just log the outgoing request
  beforeSend: data => console.log(`Spying on data that we sending to server "${data}"`),
  // Return false to prevent the on message callback from being invoked
  beforeReceive: data => {
    console.log(`Got from server this:`)
    console.log(data);
    if(data?.type === 'message') {
      Object.defineProperty(data, 'data', {
        value: JSON.stringify({intercepted: 1}),
      })
      console.log(`Want to change it to this:`)
      console.log(data);
    }
    return data;
  }
};

ws.onopen = function open() {
  // const msg = 'Message from web';
  const msg = {obj: 1};
  console.log(`Sending to server:`);
  console.log(JSON.stringify(msg));
  ws.send(JSON.stringify(msg));
};

ws.onmessage = function message(event) {
  console.log('Received from server:');
  console.log(event.data);
}
