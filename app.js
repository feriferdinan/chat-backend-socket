require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();


const logger = require('morgan');
const { EventIo } = require("./socket/socket")
const ENV = process.env.NODE_ENV;
const stage = require("./config/config")[ENV];
const PORT = process.env.PORT

const middleware = require('./middleware/middleware');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const messageRouter = require('./routes/message');
const roomRouter = require('./routes/room');


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

const server = require('http').Server(app);
const io = require('socket.io')(server);
io.set("transports", ["websocket"]);
io.use((socket, next) => {
  let token = socket.handshake.query.username;
  if (token) {
    return next();
  }
  console.log("error");
});
EventIo(io);

server.listen(PORT || 5000, () => {
  console.log(`Server now listening at localhost:${PORT || 5000}`);
});



module.exports = app;