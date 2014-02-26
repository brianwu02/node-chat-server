window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:8000');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");

    /* Logic is wrapped in .onload to ensure all mark, external JS is fully loaded.
     * all messages are stored in an array
     * Similar to the backend, we bind a function, which will react to the socket.
     * The socket event is named 'message'. When an event occurs, we expect to
     * recieve an object, data, with the property message. 
     * That message gets stored in messages and content div gets updated.
     */

    socket.on('message', function(data) {
        if (data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("there is a problem: ", data);
        }
    });

    sendButton.onclick = sendMessage = function() {
        if (name.value == "") {
            alert("please type in your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
            field.value = "";
        }
    };
}
$(document).ready(function() {
    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });
});
