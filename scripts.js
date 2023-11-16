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

// var dictionary = new Dictionary();    
// dictionary.init("./words_alpha.txt");
var bot = new Bot('Machine',10, dictionary);
var user = new Player('Phuong Ngan');
var usedWords = new Dictionary();
var match = new Game(dictionary,usedWords, bot, user, 50);




function handleKeyPress(event,check = false) {
    if (event.key === 'Enter' || check === true){
        console.log('OK');
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
                var temp = '';
                for(var step = 0; step < 10; step++) {
                    var word = bot.aWord(String.fromCharCode(match.currentWord.charCodeAt(match.currentWord.length-1)));
                    if (match.usedWords.findWord(word) === false) {
                        if (temp.length < word.length) temp = word;
                    }
                }
                match.update(temp, false);//update match points
                addDivToContainer(bot.name + ': '+ match.currentWord, 'message-container','BOT'); 
                if (match.botPoint > match.pointLimit) window.alert(match.bot.name + " is Winner");
            }
        }
        messageInput.value = '';
    }
    console.log(match.userPoint);
    console.log(match.botPoint);
}

function startGame(){
    match.playGame();
}
function resetGame(){
    match = new Game(dictionary,usedWords, bot, user, 50);
    startGame();
    document.getElementById('message-container').innerHTML = '';
}
