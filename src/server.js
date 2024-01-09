import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

app.use(express.static('./public'));

app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

export { serverHttp, io };
