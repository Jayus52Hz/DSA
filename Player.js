class Player {
    constructor(name) {
        this.name = name;
    }
    sendMessage() {
        return document.getElementById('user-message').value;
    }
}
