const valid = require('./validation');
const data = require('../model/data');

module.exports = function(app, http) {

    app.get('/', async (req, res)=> {
        
        res.end();
    })

};
