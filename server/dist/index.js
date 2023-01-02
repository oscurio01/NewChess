"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const serverPieces = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
];
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    console.log('Socket connected!');
    socket.emit('connected', 'hello!');
    socket.emit('init board', serverPieces);
    socket.on('test', () => {
        console.log('algo');
    });
    socket.on('move', ([prev, next]) => {
        console.log({ prev, next });
        const [xNext, yNext] = next;
        const [xPrev, yPrev] = prev;
        serverPieces[yNext][xNext] = serverPieces[yPrev][xPrev];
        serverPieces[yPrev][xPrev] = null;
        io.emit('move', [prev, next]);
    });
});
httpServer.listen(5000);
