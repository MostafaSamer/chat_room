const valid = require('./validation');
const data = require('../model/data');

module.exports = function(app, http) {

    app.get('/', (req, res)=> {
        var userdata = req.flash('user_info')[0];
        var valid_login = req.flash('login_res')[0];
        //console.log(userdata)
        //console.log(req.flash('login_res'))
        if (valid_login == '1') {
            res.render("home", {
                user: userdata
            });
        } else {
            res.redirect
        }
        res.end();
    })

    app.get('/register/:email_valid', (req, res)=> {
        res.render('register', {
            e_vaild: req.params.email_valid
        });
        res.end();
    })

    app.get('/login/:login_valid', (req, res)=> {
        res.render('login', {
            e_vaild: req.params.login_valid
        });
        res.end();
    })

    // new user
    app.post('/user/add', (req, res)=> {
        valid.newUser(req.body.name, req.body.email, req.body.pass, function(so) {
            if (so) {
                data.add_new_user(req.body.name, req.body.email, req.body.pass);
                res.redirect('/'); // Go to LogIn

            } else {
                console.log(" you already have an email");
                res.redirect('/register/false')
            }
        });
    })

    // login user
    app.post('/user/login', (req, res)=> {
        valid.search_user(req.body.email, req.body.pass, function(so) {
            if (so) {
                data.find_by_id(so.id, function(user_data) {
                    req.flash('login_res', '1');
                    req.flash('user_info', user_data);
                    res.redirect('/');
                })
            } else {
                console.log("Email or password is wrong");
                req.flash('login_res', '0');
                res.redirect('/login/false');
            }
        })
    })

};
