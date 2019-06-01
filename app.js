const app = require('express')();
const path = require('path');
const session = require('express-session');

// View Enginee
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

app.listen(3000, ()=> {
    console.log("App is listen at 3000");
})
