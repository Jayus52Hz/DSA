
// Tạo một cây Trie mới và một Map để lưu định nghĩa
const dictionary = new Dictionary()

// Hàm để thêm từ vựng vào cây Trie
function addVocabToMap(vocab, definition) {
  dictionary.addWord(vocab, definition);
}

async function readFile() {
  try {
    // Gửi yêu cầu đến tệp văn bản (ví dụ: vocab.txt)
    const response = await fetch('word_define.txt');
    const text = await response.text();

    // Tách từng dòng từ văn bản
    const lines = text.split('\n');

    var cnt = 0;
    // Duyệt qua từng dòng và thêm từ vựng vào cây Trie và Map
    lines.forEach(line => {
      cnt++;
      const [vocab, definition] = line.split(':');
      if (vocab && definition) {
        addVocabToMap(vocab, definition);
      }
      console.log(vocab + "                " + definition);

    });

    console.log(cnt);

  } catch (error) {
    console.error('error read file!!!', error);
  }
}

readFile();

function searchDefine() {
  const inputt = input.value.toLowerCase();
  try {
    // Tìm kiếm từ trong cây Trie thay vì dữ liệu từ API
    const word = dictionary.findWord(inputt);

    // Hiển thị kết quả trên giao diện
    if (word) {
      const definition = dictionary.getMean(inputt);
      if (definition != null)
        result.innerHTML = `<p><strong>${inputt}:</strong> ${definition}</p>`;
      else
        result.innerHTML = `<p><strong>${inputt}:</strong> This word is not found in the dictionary. </p>`;
    } else {
      result.innerHTML = `<p><strong>${inputt}:</strong> This word is not found in the dictionary. </p>`;
    }
  } catch (error) {
    console.error('search error!!!', error);
    result.innerHTML = 'search error!!!';
  }
}


function handleInput() {
  try {
    removeElements();
    const word = input.value.toLowerCase();
    const suggestions = dictionary.suggest(word);

    const autocompleteList = document.getElementById("autocompleteList");
    if (suggestions != null) 
    suggestions.forEach(suggestion => {
      const listItem = document.createElement("li");
      listItem.textContent = suggestion;
      autocompleteList.appendChild(listItem);
      listItem.addEventListener("click", function () {
        input.value = suggestion;
        removeElements();
      });
    });
  } catch (error) {
    console.error('This word has no suggestions!!!', error);
  }
};

function removeElements() {
  const autocompleteList = document.getElementById("autocompleteList");
  while (autocompleteList.firstChild) {
    autocompleteList.removeChild(autocompleteList.firstChild);
  }
}


document.getElementById("searchButton").addEventListener("click", searchDefine);
document.getElementById("input").addEventListener("keyup", function (event) {
  if (event.key == "Enter")
    searchDefine();
});
document.getElementById("input").addEventListener("input", handleInput);
