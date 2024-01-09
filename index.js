import { serverHttp } from './server';
import './src/websockets'; // importandoa arquivo de sockets para rodar no servidor

const PORT = 3001;
serverHttp.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
