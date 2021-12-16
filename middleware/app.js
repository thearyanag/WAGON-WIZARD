const express = require('express');
const http = require('http');
const app = express();
const socket = require('./socket');
const { WebSocket } = require("ws");
const wsClient = new WebSocket("ws://localhost:8000");
const { v4: uuidv4 } = require("uuid");
const port = 8080;
const morgan = require('morgan');
app.use(morgan('combined'));


app.get('/websocket' , async(req , res) => {

    wsClient.send("got from server ...")
    res.send(200);
});

app.get('/try' , async(req , res) => {
    res.status(200).send("<h1>Hey you dumbo</h1>");
});

app.get('/' , async(req , res)=> {
    res.status(200).send("Hey");
});

module.exports = app;