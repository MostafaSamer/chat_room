const router = require('express').Router();

function render_home_page(req, res) {
    var user = req.session.user;
    if (req.session.user) {

    } else {
        
    }
    res.end();
}

router.get('/', render_home_page)

module.exports = router;
