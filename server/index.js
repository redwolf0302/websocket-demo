const WebSocket = require("ws");
const express = require('express');
const http = require('http');
const url = require('url');

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
    app.all('/*', express.static('static'));
    //配置WebSocket
    const wss = new WebSocket.Server({
        path: '/chat',
        server
    });

    function heartbeat() {
        this.isAlive = true;
    }

    function handleClose() {
        console.log(arguments)
    }

    function handleMessage(data) {
        wss.clients.forEach((ws) => {
            if (ws !== this) {
                ws.send(data);
            }
        });
    }
    wss.on("connection", (ws, req) => {
        const {
            query: {
                userId,
                nick
            }
        } = url.parse(req.url, true);
        ws.isAlive = true;
        ws.userId = userId;
        ws.nick = nick;
        console.log(`client ${ws.userId}#${ws.nick} has connected`);
        ws.on('pong', heartbeat);
        ws.on('close', handleClose);
        ws.on('message', handleMessage);
    });
    const interval = setInterval(function ping() {
        wss.clients.forEach(function each(ws) {
            // console.log(`client ${ws.userId}#${ws.nick} is alive:${ws.isAlive}`);
            if (ws.isAlive === false) {
                console.warn(`client ${ws.userId}#${ws.nick} is terminated`);
                return ws.terminate();
            }
            ws.isAlive = false;
            ws.ping(noop);
            ws.send('hello');
        });
    }, 30000);
    //启动服务
    console.log(`http server: http://localhost:${port}`);
    console.log(`websocket server: ws://localhost:${port}/chat`);
    server.listen(port);
}
module.exports = launch;