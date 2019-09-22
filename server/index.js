const WebSocket = require("ws");
const express = require("express");
const http = require("http");
const url = require("url");
const OPCODES = {
  GROUP: 1,
  COMMAND: 2,
  WHOAMI: 3,
  CLIENT_LEFT: 4
};

const COMMANDS = {
  TESTING: 1
};

function noop() {}
/**
 * @author Evan redwolf0302@gmail.com
 * @version 1.0.0
 * @description 服务器启动函数
 */
const launch = () => {
  let port = 8080;
  //配置express服务
  const app = new express();
  const server = http.createServer(app);
  app.all("/*", express.static("static"));
  //配置WebSocket
  const wss = new WebSocket.Server({
    path: "/chat",
    server
  });

  app.get("/api/users", (req, res) => {
    let users = [];
    wss.clients.forEach(ws => {
      users.push({
        userId: ws.userId,
        nick: ws.nick
      });
    });
    res.json(users);
  });

  function heartbeat() {
    this.isAlive = true;
  }

  function handleClose(code, reason) {
    console.log(
      `client ${this.userId}#${this.nick} is disconnected. (code:${code}, reason:${reason})`
    );
    wss.clients.forEach(ws => {
      if (ws !== this) {
        ws.send(
          JSON.stringify({
            payload: {
              userId: this.userId,
              nick: this.nick
            },
            opcode: OPCODES.CLIENT_LEFT
          })
        );
      }
    });
  }

  function handleMessage(data) {
    const parsedData = JSON.parse(data);
    if (parsedData.opcode === OPCODES.GROUP) {
      wss.clients.forEach(ws => {
        if (ws !== this) {
          ws.send(data);
        }
      });
    } else if (parsedData.opcode === OPCODES.COMMAND) {
      switch (parsedData.command) {
        case COMMANDS.TESTING:
          wss.clients.forEach(ws => {
            if (ws === this) {
              ws.send(data);
            }
          });
          break;
      }
    }
  }

  function sayHello(self) {
    let helloFrame = {
      opcode: OPCODES.WHOAMI,
      payload: {
        userId: self.userId,
        nick: self.nick
      }
    };
    wss.clients.forEach(ws => {
      if (ws !== self) {
        ws.send(JSON.stringify(helloFrame));
      }
    });
  }

  wss.on("connection", (ws, req) => {
    const {
      query: { userId, nick }
    } = url.parse(req.url, true);
    ws.isAlive = true;
    ws.userId = userId;
    ws.nick = nick;
    console.log(`client ${ws.userId}#${ws.nick} has connected`);
    ws.on("pong", heartbeat);
    ws.on("close", handleClose);
    ws.on("message", handleMessage);
    sayHello(ws);
  });
  const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) {
        console.warn(`client ${ws.userId}#${ws.nick} is terminated`);
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping(noop);
      // ws.send('hello');
    });
  }, 30000);
  //启动服务
  console.log(`http server: http://localhost:${port}`);
  console.log(`websocket server: ws://localhost:${port}/chat`);
  server.listen(port);
};
module.exports = launch;
