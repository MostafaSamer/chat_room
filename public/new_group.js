var id_list = [];


// create non exist, random id
var rand_id = function(callback) {
    new_id = 0;
    result = false;
    while(!check_id(new_id)) {
        new_id++;
    }
    id_list.push(new_id);
    callback(new_id);
}

// flase if exist
var check_id = function(id) {
    //callback(!id_list.includes(id));
    //console.log("Checked");
    return !id_list.includes(id)
}

// false if exist
var check_id_cb = function(id, callback) {
    callback(!id_list.includes(id));
}

module.exports = {
rand_id: rand_id,
check_id: check_id,
check_id_cb: check_id_cb
};
