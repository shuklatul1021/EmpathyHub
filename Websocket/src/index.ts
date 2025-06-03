import { WebSocketServer } from "ws"
const wss = new WebSocketServer({ port : 8080 })

wss.on("connection" , function connection (ws){
    ws.on("message" , function chat(data){
        ws.send("Got It Bro");
    })
})