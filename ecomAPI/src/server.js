import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initwebRoutes from './route/web';
import connectDB from './config/connectDB';
import http from 'http';
import { sendMessage } from './services/messageService';
require('dotenv').config();

let app = express();

// Trust proxy - important when behind Nginx
app.set('trust proxy', true);

// CORS configuration
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader(
        'Access-Control-Allow-Origin',
        process.env.URL_REACT || 'https://deploy-aws-ec2-1.onrender.com/',
    );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app);
initwebRoutes(app);

const server = http.createServer(app);

const socketIo = require('socket.io')(server, {
    cors: {
        origin: process.env.URL_REACT || 'https://deploy-aws-ec2-1.onrender.com/',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

socketIo.on('connection', (socket) => {
    console.log('New client connected' + socket.id);

    socket.on('sendDataClient', function (data) {
        sendMessage(data);
        socketIo.emit('sendDataServer', { data });
    });
    socket.on('loadRoomClient', function (data) {
        socketIo.emit('loadRoomServer', { data });
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

let port = process.env.PORT || 8003; // Use a normal HTTP port
connectDB();

// Redirect HTTP to HTTPS
if (process.env.NODE_ENV === 'production') {
    const http = require('http');
    http.createServer((req, res) => {
        res.writeHead(301, { Location: 'https://' + req.headers['host'] + req.url });
        res.end();
    }).listen(80);
}

server.listen(port, () => {
    console.log('Backend Nodejs is running on the port : ' + port);
});
