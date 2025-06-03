$(document).ready(function () {
    var socket = io.connect("localhost:3000", {
        transports: ['websocket'],
        // query: {}/*  */
    });

    socket.emit('join',"1");
    socket.on('handshacking', function (data) {
        console.log('Socket Connected', data);
    });

    socket.on('testing', function (data) {
        var alertHtml = '<li><div class="alert alert-success" role="alert">' + data + '</div></li>';
        // Append to specific message
        $('#notification-list').append(alertHtml);
    });

    socket.on('order-notification', function (data) {
        var alertHtml = '<li><div class="alert alert-info" role="alert">' + data + '</div></li>';
        // Append to specific message
        $('#notification-list').append(alertHtml);
    });
});