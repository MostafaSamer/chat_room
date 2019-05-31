
module.exports = function(app, http) {

    app.get('/', (req, res)=> {
        res.render('home')
        res.end();
    })

    app.get('/new', (req, res)=> {
        res.render('name');
    })

    app.post('/name', (req, res)=> {
        var name = req.body.name;
        res.end();
    })

};
