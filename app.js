require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const http = require("http");
var path = require('path');
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser')
var cors = require('cors');


var logger = require('morgan');
const socketio = require('socket.io');
const { EventIo } = require("./socket/socket")
const ENV = process.env.NODE_ENV;
const stage = require("./config/config")[ENV];
const PORT = process.env.SERVER_PORT || 3010

var middleware = require('./middleware/middleware');

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var messageRouter = require('./routes/message');
var roomRouter = require('./routes/room');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', function (req, res) {
  res.send({ message: "CHAT YUK" })
});
app.use('/auth', authRouter);
app.use(middleware.auth);
app.use('/user', usersRouter);
app.use('/message', messageRouter);
app.use('/room', roomRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const server = http.createServer(app);

const io = socketio(server);
io.set("transports", ["websocket"]);
io.use((socket, next) => {
  let token = socket.handshake.query.username;
  if (token) {
    return next();
  }
  console.log("error");
});

EventIo(io);

server.listen(PORT || 3000, '0.0.0.0', () => {
  console.log(`Server now listening at localhost:${PORT}`);
});


module.exports = app;