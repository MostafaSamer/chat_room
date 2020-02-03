const router = require('express').Router();

const new_group = require('../public/new_group');

function render_home_page(req, res) {
    console.log(req.session.user);
    console.log(req.session.group);
    res.render('home', {
        user: req.session.user,
        group: req.session.group
    });
    res.end();
}

router.get('/index.html.var', render_home_page)

router.post('/newUser', (req, res, next)=> {
    req.session.user = req.body.user;
    if (req.body.group != '') {
        groub_id = Number(req.body.group);  // will go to the else in case the user enter a letter
        if (!new_group.check_id(groub_id)) {
            console.log("Get here");
            req.session.group = groub_id;
        }
         else {
             res.render('error', {
                 err_mess: 'This id does not exist, yet'
             })
             //res.end();
         }
    } else {
        new_group.rand_id(function(new_id) {
            req.session.group = new_id
        })
    }
    render_home_page(req, res)
})

router.get('/logout', (req, res)=> {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;
