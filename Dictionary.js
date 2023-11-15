class Dictionary {
      constructor() {
          this.dictionary = new Trie();
          console.log("OK");
      }
      init(file) {
          var rawFile = new XMLHttpRequest();
          rawFile.open("GET", file, false);
          rawFile.onreadystatechange = () => {
              if (rawFile.readyState === 4) {
                  if (rawFile.status === 200 || rawFile.status == 0) {
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
      findString(S) {
          return this.dictionary.findString(S);
      }
      aWordStartWith(c){
          return this.dictionary.aWordStartWith(c);
      }
}