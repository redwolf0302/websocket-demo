const WebSocket = require("ws");
const express = require('express');
const http = require('http');
/**
 * @author Evan redwolf0302@gmail.com
 * @version 1.0.0
 * @description 服务器启动函数
 * @param {Number} port 默认8080
 */
const launch = (port = 8080) => {
    const app = new express();
    const server = http.createServer(app);

    const wss = new WebSocket.Server({
        server
    });
    wss.on("connection", function (ws) {
        console.log("websocket connected");
        ws.send("hello!");
    });

    server.listen(port);
}
module.exports = launch;