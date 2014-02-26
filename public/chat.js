window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:8000');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");

    /* Logic is wrapped in .onload to ensure all mark, external JS is fully loaded.
     * all messages are stored in an array
     * Similar to the backend, we bind a function, which will react to the socket.
     * The socket event is named 'message'. When an event occurs, we expect to
     * recieve an object, data, with the property message. 
     * That message gets stored in messages and content div gets updated.
     */


    socket.on('message', function(data) {
        if (data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("there is a problem: ", data);
        }
    });

    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text });
    };
};

