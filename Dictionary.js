
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Node {
    constructor() {
        this.child = new Array(26).fill(null);
        this.exist = 0;
        this.cnt = 0;
    }
}
class Dictionary {
    constructor() {
        this.cur = 0;
        this.root = new Node();
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
                        this.addWord(word);
                    });
                }
            }
        }
        rawFile.send(null);
    }
    addWord(s) {
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

    deleteWordRecursive(p, s, i) {
        if (i !== s.length) {
            const c = s.charCodeAt(i) - 'a'.charCodeAt(0);
            const isChildDeleted = this.deleteWordRecursive(p.child[c], s, i + 1);
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

    deleteWord(s) {
        if (!this.findWord(s)) return;

        this.deleteWordRecursive(this.root, s, 0);
    }

    findWord(s) {
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
        var index = c.charCodeAt(0) - 'a'.charCodeAt(0);
        let p = this.root.child[index];
        let S = c;
        while (p !== null && p.cnt > 0) {
            index = rand(0, 25);
            var save = new Set();
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
    suggestHelper(node, list, curr, maxx) {
        if (node.exist > 0 && list.length < maxx) {
            list.push(curr);
        }
        for (let i = 0; i < 26; i++) {
            if (node.child[i] !== null) {
                this.suggestHelper(node.child[i], list, curr + String.fromCharCode(i + 'a'.charCodeAt(0)), maxx);
            }
        }
    }

    suggest(word, maxx = 20) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const c = word.charCodeAt(i) - 'a'.charCodeAt(0);
            if (!node.child[c]) {
                return;
            }
            node = node.child[c];
        }

        let list = [];
        this.suggestHelper(node, list, word, maxx);
        return list;
    }
}

