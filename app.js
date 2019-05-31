const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const io = require('socket.io')(http);

const controller = require('./public/controller');

app.set('view engine', 'ejs');
app.use(express.static('./views'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: "sh",
    saveUninitialized: true,
    resave: true
}))


controller(app, http);

http.listen(3000, ()=> {
    console.log("Server is running in port 3000");

    io.on('connection', (socket)=> {
        console.log("User Open");
        // handle new messages
        socket.on('new:message', function (msgObject) {
            io.emit('new:message', msgObject);
        });

        // handle new members
        socket.on('new:member', function (name) {
            io.emit('new:member', name);
        })
    })
})
