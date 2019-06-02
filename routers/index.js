const router = require('express').Router();

function render_home_page(req, res) {
    console.log(req.session.user);
    res.render('home', {
        user: req.session.user
    });
    res.end();
}

router.get('/', render_home_page)

router.post('/newUser', (req, res, next)=> {
    req.session.user = req.body.user;
    render_home_page(req, res)
})

router.get('/logout', (req, res)=> {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;
