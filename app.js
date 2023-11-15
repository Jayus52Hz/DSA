
// Tạo một cây Trie mới và một Map để lưu định nghĩa
const trie = new Dictionary()
const definitionMap = new Map();

// Hàm để thêm từ vựng vào cây Trie và Map
function addVocabToMap(vocab, definition) {
  trie.addString(vocab);
  definitionMap.set(vocab, definition);
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
  const inputt = wordSearch.value.toLowerCase();
  try {
    // Tìm kiếm từ trong cây Trie thay vì dữ liệu từ API
    const word = trie.findString(inputt);

    // Hiển thị kết quả trên giao diện
    if (word) {
      const definition = definitionMap.get(inputt);
      if (definition)
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

window.searchDefine = searchDefine;
