const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

var app = express();

// socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);

// POST req
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// View Enginee
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

// Routers
var routers = require('./routers/index');
app.use('/', routers);

server.listen(3001, function() {
    console.log("App is listen at 3000");

    io.on('connection', function (socket) {

        console.log("Incognito entered....");

        // handle new messages
        socket.on('new:mess', function (msgObject) {
            io.emit('new:mess', msgObject);
        });

        /*
        // handle new members
        socket.on('new:user', function (name) {
            io.emit('new:user', name);
        });
        */
    });
})
