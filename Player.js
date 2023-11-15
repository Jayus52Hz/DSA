
class Player {
    constructor(name) {
        this.name = name;
    }
    sendMessage() {
        var check = false;
        while (check === false) {
            document.getElementById("user-message").addEventListener('keydown', function (event) {
                if (event.key === 'enter') {
                    var messageInput = document.getElementById("user-message");
                    var message = messageInput.value.toLowerCase();
                    if (message.trim() !== "") {
                        var exist = dictionary.findString(message);
                        if (exist === true) {
                            var messageElement = document.createElement('div');
                            var messageContainer = document.getElementById("message-container");
                            messageElement.textContent = message;
                            messageContainer.append(messageElement);
                            check = true;
                        }
                    }
                    else messageInput.value = "";
                }
            });
        }
    }
}