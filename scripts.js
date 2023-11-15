//Random
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//dictionary
class Dictionary{
  constructor() {
      this.dictionary = new Trie();
  }
  init(file){
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = () => {
      if(rawFile.readyState === 4)  {
          if(rawFile.status === 200 || rawFile.status == 0) {
              var allText = rawFile.responseText;
              var wordsArray = allText.split(/\s+/);
              wordsArray.forEach((word) => {
                  this.dictionary.addString(word);
              });
          }
        }
      }
      rawFile.send(null);
  }
}
var dictionary = new Dictionary();
dictionary.init("./words_alpha.txt");
//console.log('apple');
console.log(dictionary.dictionary.findString('timer'));
console.log(dictionary.dictionary.aWordStartWith('c'));





function openTab(evt, tabName) {
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
    evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

function sendMessage(){
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value.toLowerCase();
    if (message.trim() !== ""){
        var messageElement = document.createElement('div');
        var check = dictionary.dictionary.findString(message);
        messageElement.textContent = "Machine: "+ check;
        var messageContainer = document.getElementById("message-container");
        messageContainer.append(messageElement);
        messageInput.value = "";
    }
    updateContainerHeight();
}
//Tracking user press Enter
function handleKeyPress(event){
    if (event.keyCode === 13){
        sendMessage();
    }
}

// Hàm để cập nhật chiều cao của container khi trang được tải hoặc thay đổi kích thước
function updateContainerHeight() {
    var windowHeight = window.innerHeight; // Chiều cao của trình duyệt
    var container = document.getElementById("message-container");
    container.style.maxHeight = windowHeight * 0.8 + "px"; // Đặt chiều cao tối đa của container là 80% chiều cao của trình duyệt
    container.scrollTop = container.scrollHeight; // Cuộn xuống dưới cùng khi có tin nhắn mới
}
window.addEventListener("load", updateContainerHeight);
window.addEventListener("resize", updateContainerHeight);
