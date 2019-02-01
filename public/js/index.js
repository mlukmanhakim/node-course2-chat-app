
var socket = io();
function scrollToBottom(){

    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();


    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    };

}
socket.on('connect', function (){
    console.log("Connected to server");
});
socket.on('disconnect', function(){
    console.log("Disconnect from server");
});

socket.on('newMessage', function(message){
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text : message.text,
        from : message.from,
        createdAt : formatedTime
    });

    jQuery('#messages').append(html); 
    scrollToBottom();
  });


jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
     socket.emit('createMessage', {
        from : 'User',
        text : messageTextBox.val()
    }, function(){
        messageTextBox.val('');
    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation tidak suport bowser anda');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function (position){
        console.log(position);
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            lat : position.coords.latitude,
            lng : position.coords.longitude
        })
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('unable to fetch location');
    });
});

socket.on('newLocationMessage', function(message){
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        text : message.text,
        from : message.from,
        url : message.url,
        createdAt : formatedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank"> My Current Location</a>');
    // var formatedTime = moment(message.createdAt).format('h:mm a');
    // li.text(`${message.from} ${formatedTime} : `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});