'use strict'

$(function() {
    let socket = io();
    let mess = '';  // mess text
    let name = ''; // user name
    let new_mess = $('#new_mess'); // mess input field
    let new_user = $('#new_user'); // mess input field

    // Submit new User
    $('.submit_user').on('click', function(event) {
        if (new_user.val() != '') {
            name = new_user.val();
            $('.enter_name_form').hide();
            socket.emit('new:user', name);
            console.log("New User event emited");
        }
    })

    // Submit new Mess
    $('.submit_mess').on('click', function(event) {
        if (new_mess.val() != '') {
            mess = new_mess.val();
            new_mess.val('');
            socket.emit('new:mess', {name: name, mess: mess})
        }
    })

    // handle the events
    socket.on('new:user', function(name) {
        console.log("User from event");
        $('.message_box').append($('<div class="msg new-member">').text(name + ' has joined the room'))
    })

    socket.on('new:mess', function(mess_obj) {
        $('.message_box').append($('<div class="msg new-chat-message">').html('<span class="member-name">' + mess_obj.name + '</span>: ' + mess_obj.mess))
    })

})
