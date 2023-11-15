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