import { createServer } from 'http';
import { Server, Socket as SocketBase} from 'socket.io';

const initialBoard = [
  ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
  ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
  ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
];

interface Socket extends SocketBase{
  roomId?: string,
}

interface Room{
  board: (string | null)[][];
  current?: Socket;
  players: Socket[];
}

const rooms: Record<string, Room> = {}

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});


io.on('connection', (socket: Socket) => {
  //console.clear();
  console.log("el nodo con ip:" + socket.handshake.address);

  socket.emit('connected');

  socket.on('join room', (roomId)=>{
    socket.roomId = roomId;
    if(!rooms[roomId]){
      rooms[roomId] = {
        board:JSON.parse(JSON.stringify(initialBoard)),
        current: undefined,
        players: [],
      };
    }
    
    console.log({roomId});

    rooms[roomId].players.push(socket); 
    socket.join(roomId);

    socket.emit('init board', rooms[roomId].board);
  });

  //socket.emit('init board', initialBoard);

  socket.on('move', ([prev, next]) => {
    const roomId = socket.roomId;
    if(!roomId) return;

    const room =rooms[roomId];
    const [xNext, yNext] = next;
    const [xPrev, yPrev] = prev;
    
    if(!room) return;
    
    console.log({ roomId, np: [prev, next] });
    room.board[yNext][xNext] = room.board[yPrev][xPrev];
    room.board[yPrev][xPrev] = null;

    io.to(roomId).emit('move', [prev, next]);
  });

  socket.on('disconnecting', ()=>{
    const socketRooms = [...socket.rooms];
    socketRooms.forEach(r => {
      if(!rooms[r]) return;
      rooms[r].players = rooms[r].players.filter((p)=> p != socket);

      io.to(r).emit('player left');
    });
    console.log(socket.rooms);
  })

});

httpServer.listen(8090);

