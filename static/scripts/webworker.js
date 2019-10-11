console.log("webworker started");
let ws = null;
let WEBSOCKET_URL = "ws://ws-demo.ej-journey.com/chat";
const COMMANDS = {
  CONNECT: 1,
  DISCONNECT: 2,
  SEND: 3,
  CONNECTED: 4,
  DISCONNECTED: 5,
  CONNECT_ERROR: 6,
  RECIEVE: 7
};
function onOpen(e) {
  self.postMessage({ command: COMMANDS.CONNECTED });
}
function onClose(e) {
  self.postMessage({ command: COMMANDS.DISCONNECTED });
}
function onMessage(e) {
  let data = JSON.parse(e.data);
//   self.postMessage({ command: COMMANDS.RECIEVE, data });
}
function onError(e) {
  console.error(e);
  self.postMessage({ command: COMMANDS.DISCONNECTED });
}
self.addEventListener("message", ({ data }) => {
  console.log(data);
  switch (data.command) {
    case COMMANDS.CONNECT:
      ws = new WebSocket(
        `${WEBSOCKET_URL}?userId=${data.data.userId}&nick=${encodeURIComponent(
          data.data.nick
        )}`
      );
      ws.addEventListener("open", onOpen);
      ws.addEventListener("close", onClose);
      ws.addEventListener("message", onMessage);
      ws.addEventListener("error", onError);
      break;
    case COMMANDS.DISCONNECT:
      if (ws) {
        ws.close(3001, "logout");
      }
      break;
    case COMMANDS.SEND:
      ws.send(JSON.stringify(data.data));
      break;
  }
});
