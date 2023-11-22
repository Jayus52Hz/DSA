
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Node {
    constructor() {
        this.child = new Array(26).fill(null);
        this.exist = 0;
        this.cnt = 0;
        this.mean = '';
    }
}
class Dictionary {
    constructor() {
        this.cur = 0;
        this.root = new Node();
    }
    async init(file) {
        try {
            var response = await fetch(file);
            var temp = await response.text();
            var lines = temp.split('\n');

            ///đếm số từ xem đủ không
            var cnt = 0;

            lines.forEach(line => {
                //line = line.trim();  này code cũ
                //this.addWord(line);
                //console.log(line);
                /// code mới thay thế 
                cnt++;
                const [vocab, definition] = line.split(':');
                if (vocab && definition) {
                    this.addWord(vocab, definition);
                }
                console.log(vocab + "                " + definition);
            });

            console.log(cnt);
        } catch (error) {
            console.error('error read file!!!', error);
        }
    }
    addWord(s, mean = '') {
        let p = this.root;
        for (let i = 0; i < s.length; i++) {
            const f = s.charAt(i);
            const c = f.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!p.child[c]) p.child[c] = new Node();
            p = p.child[c];
            p.cnt++;
        }
        p.exist++;
        p.mean = mean;
    }
    getMean(s) {
        let p = this.root;
        for (let i = 0; i < s.length; i++) {
            const f = s.charAt(i);
            const c = f.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!p.child[c]) return null;
            p = p.child[c];
        }
        if (p.exist > 0) return p.mean;
        return null;
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
        console.log("--------------------------------");
        var index = c.charCodeAt(0) - 'a'.charCodeAt(0);
        let p = this.root.child[index];
        let S = c;
        while (p !== null && p.cnt > 0) {
            index = 0;
            var list = [...Array(25).keys()];
            list.splice(list.indexOf(index), 1);
            while (p.child[index] === null) {
                if (list.length === 0) return S;
                index = list[Math.floor(Math.random() * list.length)];
                list.splice(list.indexOf(index), 1);
            }
            console.log(list);
            S += String.fromCharCode(index + 'a'.charCodeAt(0));
            p = p.child[index];
        }
        return S;
    }
    maximumWord(c) {
        var word = this.aWordStartWith(c);
        for (var i = 0; i < 10; i++) {
            var temp = this.aWordStartWith(c);
            if (temp.length > word.length) word = temp;
        }
        return word;
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

