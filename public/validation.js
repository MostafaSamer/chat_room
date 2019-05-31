const md5 = require('md5');
const data = require('../model/data');

var newUser = function(name, email, pass, callback) {
    // valid for the new user email
    data.find_by_email(email, function(user_data) {
        if (!user_data) { // does not found
            callback(true);
        } else { // found
            callback(false)
        }
    })
}

var search_user = function(email, pass, callback) {
    data.find_by_email(email, function(user_data) {
        if (user_data && md5(pass) == user_data.value) {
            callback(user_data)
        } else {
            callback()
        }
    })
}

module.exports = {
    newUser: newUser,
    search_user: search_user
};



/*
if (!data.data.rows[0]) {
    callback(true)
} else {
    callback(false)
}
*/
