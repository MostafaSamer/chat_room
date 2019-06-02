const router = require('express').Router();

function render_home_page(req, res) {
    res.render('home');
    res.end();
}

router.get('/', render_home_page)

router.get('/logout', (req, res)=> {
    res.redirect('/');
})

module.exports = router;
