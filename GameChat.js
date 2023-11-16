function addDivToContainer(source,container,className) {
      var messageContainer = document.getElementById(container);
      var newDiv = document.createElement('div');
      newDiv.innerHTML = source;
      newDiv.className = className;
      if (className === "USER") newDiv.style.textAlign = "right";
      if (className === "BOT") newDiv.style.textAlign = "left";
      messageContainer.appendChild(newDiv);
}

class Game {
      constructor(dictionary, usedWords, bot, user, pointLimit) {
            this.dictionary = dictionary;
            this.usedWords = usedWords;
            this.bot = bot;
            this.user = user;
            this.botPoint = 0;
            this.userPoint = 0;
            this.currentWord = "";
            this.pointLimit = pointLimit;
      }
      playGame() {
            this.currentWord = bot.aWord(String.fromCharCode('a'.charCodeAt(0) + rand(0, 25)));
            this.botPoint += this.currentWord.length;
            this.usedWords.addWord(this.currentWord);
            addDivToContainer(this.bot.name + ': ' + this.currentWord,'message-container','BOT'); 
            
      }
      checkAvailableWord(word){
            // console.log(this.usedWords.findWord(word) === false );
            // console.log(this.currentWord.charCodeAt(this.currentWord.length - 1) === word.charCodeAt(0));
            // console.log(this.dictionary.findWord(word) === true);
            return this.usedWords.findWord(word) === false 
                  && this.currentWord.charCodeAt(this.currentWord.length - 1) === word.charCodeAt(0)
                  && this.dictionary.findWord(word) === true;
      }
      update(message, pointForUser){
            this.currentWord = message;
            this.usedWords.addWord(message);
            if (pointForUser === true) this.userPoint += message.length;
            else this.botPoint += message.length;
      }
}