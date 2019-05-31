const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

const controller = require('./public/controller');

app.set('view engine', 'ejs');
app.use(express.static('./views'));
app.use(flash());
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
})
