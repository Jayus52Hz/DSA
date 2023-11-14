//Random
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Trie implement
class Node {
  constructor() {
      this.child = new Array(26).fill(null);
      this.exist = 0;
      this.cnt = 0;
  }
}

class Trie {
  constructor() {
      this.cur = 0;
      this.root = new Node();
  }

  addString(s) {
      let p = this.root;
      for (let i = 0; i < s.length; i++) {
          const f = s.charAt(i);
          const c = f.charCodeAt(0) - 'a'.charCodeAt(0);
          if (!p.child[c]) p.child[c] = new Node();
          p = p.child[c];
          p.cnt++;
      }
      p.exist++;
  }

  deleteStringRecursive(p, s, i) {
      if (i !== s.length) {
          const c = s.charCodeAt(i) - 'a'.charCodeAt(0);
          const isChildDeleted = this.deleteStringRecursive(p.child[c], s, i + 1);
          if (isChildDeleted) p.child[c] = null;
      } 
      else p.exist--;

      if (p !== this.root) {
          p.cnt--;
          if (p.cnt === 0) {
              return true;
          }
      }
      return false;
  }

  deleteString(s) {
      if (!this.findString(s)) return;

      this.deleteStringRecursive(this.root, s, 0);
  }

  findString(s) {
      let p = this.root;
      for (let i = 0; i < s.length; i++) {
          const f = s.charAt(i);
          const c = f.charCodeAt(0) - 'a'.charCodeAt(0);
          if (!p.child[c]) return false;
          p = p.child[c];
      }
      return p.exist !== 0;
  }

  size() {
      let sum = 0;
      for (let i = 0; i < 26; i++) {
          if (this.root.child[i] !== null) sum += this.root.child[i].cnt;
      }
      return sum;
  }

  aWordStartWith(c) {
      const i = c.charCodeAt(0) - 'a'.charCodeAt(0);
      let p = this.root.child[i];
      let S = c;
      while (p !== null && p.cnt > 0) {
          let index = rand(0, 25);
          const save = new Set();
          while (p.child[index] === null || p.child[index].cnt <= 0) {
              save.add(index);
              if (save.size === 26) return S;
              index = rand(0, 25);
          }
          S += String.fromCharCode(index + 'a'.charCodeAt(0));
          p = p.child[index];
      }
      return S;
  }
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
