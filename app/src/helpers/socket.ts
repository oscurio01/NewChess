import { io } from 'socket.io-client';

const socket = io('http://localhost:8090');

socket.on('connected', (data)=>{
    console.log({ data });
});

export default socket;