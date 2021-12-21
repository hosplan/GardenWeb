let connection = new signalR.HubConnectionBuilder().withUrl("/realtimeCheckHub").build();

connection.on("ReceiveMessage", function (user, message) {
    console.log("~~~");
});

connection.start().then(function () {
    console.log("start");
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
})