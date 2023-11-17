function openTab(event, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

var bot = new Bot('Machine');
var user = new Player('Phuong Ngan');
var match;




function handleKeyPress(event,check = false) {
    if (event.key === 'Enter' || check === true){
        var messageInput = document.getElementById('message-input');
        var message = messageInput.value.trim();
        //console.log(match.checkAvailableWord(message));
        if (message !== "" && match.checkAvailableWord(message)){
            //User play
            match.update(message,true);
            addDivToContainer(message + ' :' + user.name,"message-container",'USER'); 
            messageInput.value = "";
            if (match.userPoint > match.pointLimit) window.alert(match.user.name + " is Winner");
            else
            {
                //Bot play
                var temp = match.bot.aWord(String.fromCharCode(match.currentWord.charCodeAt(match.currentWord.length-1)));
                match.update(temp, false);//update match points
                addDivToContainer(bot.name + ': '+ match.currentWord, 'message-container','BOT'); 
                if (match.botPoint > match.pointLimit) window.alert(match.bot.name + " is Winner");
            }
        }
        messageInput.value = '';
    }
    document.getElementById('user-point').textContent = match.userPoint;
    document.getElementById('bot-point').textContent = match.botPoint;
}
var pointLimit = 50;
function setPointLimit(event){
    if (event.key == 'Enter'){
        var pointInput = document.getElementById("point-limit").value.trim();
        if (pointInput!== '') {
            pointLimit = pointInput;
        }
        console.log(pointLimit);
        document.getElementById("point-limit").value = '';
    }
}
function startGame(){
    match = new Game(bot, user,pointLimit);
    match.playGame();
}
function resetGame(){
    document.getElementById('message-container').innerHTML = '';
    startGame();

}
