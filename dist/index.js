"use strict";var _server = require('./server');
require('./websockets'); // importandoa arquivo de sockets para rodar no servidor

const PORT = 3001;
_server.serverHttp.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));
