const express = require("express");

const http = require("http");

const WebSocket = require("ws");

const port = 6969;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function(ws) {
  ws.on('message', data => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })
})

app.use(express.static("."))

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
