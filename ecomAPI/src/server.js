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
    const origin = req.headers.origin;
    // Remove trailing slash from allowed origins
    const allowedOrigins = [process.env.URL_REACT, 'https://deploy-aws-ec2-1.onrender.com'].map(
        (url) => (url ? url.replace(/\/$/, '') : ''),
    );

    // Check if the request origin is in our allowed origins
    if (origin && allowedOrigins.includes(origin.replace(/\/$/, ''))) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message,
    });
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app);
initwebRoutes(app);

const server = http.createServer(app);

const socketIo = require('socket.io')(server, {
    cors: {
        // Use the same CORS configuration as the main app
        origin: [process.env.URL_REACT, 'https://deploy-aws-ec2-1.onrender.com'].map((url) =>
            url ? url.replace(/\/$/, '') : '',
        ),
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
