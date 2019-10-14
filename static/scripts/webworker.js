console.log("webworker started");
let ws = null;
let WEBSOCKET_URL = "wss://api-self.ej-journey.com/chat";
// let WEBSOCKET_URL = "ws://ws-demo.ej-journey.com/chat";
const COMMANDS = {
  CONNECT: 1,
  DISCONNECT: 2,
  SEND: 3,
  CONNECTED: 4,
  DISCONNECTED: 5,
  CONNECT_ERROR: 6,
  RECIEVE: 7
};

var db;
var request = indexedDB.open("websocket-demo", 1);
request.onerror = function(event) {
  console.error("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function(event) {
  db = event.target.result;
  db.objectStore("messages").getAll();
};
request.onupgradeneeded = function(event) {
  console.log(event);
  // 保存 IDBDataBase 接口
  var db = event.target.result;
  // 为该数据库创建一个对象仓库
  if (!db.objectStoreNames.contains("messages")) {
    var objectStore = db.createObjectStore("messages", { autoIncrement: true });
    objectStore.createIndex("userId", "userId", { unique: false });
  }
};

function onOpen(e) {
  self.postMessage({ command: COMMANDS.CONNECTED });
}
function onClose(e) {
  self.postMessage({ command: COMMANDS.DISCONNECTED });
}
function onMessage(e) {
  let data = JSON.parse(e.data);
  if (db) {
    db.transaction(["messages"], "readwrite")
      .objectStore("messages")
      .add(data.payload);
  }
  //   self.postMessage({ command: COMMANDS.RECIEVE, data });
  navigator.storage.estimate().then(function(estimate) {
    console.log(
      `estimate:${estimate.usage}/${estimate.quota}=${(
        (estimate.usage / estimate.quota) *
        100
      ).toFixed(4)}`
    );
    // console.log((estimate.usage / estimate.quota * 100).toFixed(2));
  });
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
