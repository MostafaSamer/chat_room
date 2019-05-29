const md5 = require('md5');
const nodeCouchdb = require('node-couchdb');

const couch = new nodeCouchdb({
    auth:{
        user: "admin",
        pass: "root"
    }
})

const dbName = "chat_room";
const viewUrl = "_design/user_view/_view/user";

var find_by_email = function(email, callback) {
    findUrl = viewUrl + '?key=\"' + email + '\"'
    couch.get(dbName, findUrl).then(
        function(data, header, status) {
            callback(data.data.rows[0])
        },
        function(err) {
            console.log("ERROR!");
        }
    )
}

var find_by_id = function(id, callback) {
    couch.get(dbName, id).then(
        function(data, header, status) {
            //console.log(data.data);
            callback(data.data);
        },
        function(err) {
            console.log("Erro in searching by id");
        }
    )
}

var add_new_user = function(name, email, pass) {
    couch.uniqid().then(function(ids) {
        const id = ids[0];
        couch.insert(dbName, {
            name: name,
            email: email,
            pass: md5(pass)
        }).then(
            function(data, header, status) {
                console.log("Data Saved");
            },
            function(err) {
                console.log("Error in inserting new Data");
            }
        )
    })
}

module.exports = {
    find_by_email: find_by_email,
    add_new_user: add_new_user,
    find_by_id: find_by_id
};
