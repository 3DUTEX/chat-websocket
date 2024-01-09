"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _http = require('http'); var _http2 = _interopRequireDefault(_http);
var _socketio = require('socket.io');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

const app = _express2.default.call(void 0, );

app.use(_express2.default.static('./public'));

app.use(_cors2.default.call(void 0, ));

const serverHttp = _http2.default.createServer(app);

const io = new (0, _socketio.Server)(serverHttp, {
  cors: {
    origin: '*',
  },
});

io.use(_cors2.default.call(void 0, ));

exports.serverHttp = serverHttp; exports.io = io;
