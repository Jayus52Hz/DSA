class Bot{
    constructor(name,level,dictionary){
        this.name = name;
        this.brain = new Dictionary();
        this.brain.init("./words_alpha.txt");
    }
    aWord(c){
        var word = this.brain.maximumWord(c);
        this.brain.deleteWord(word);
        return word;
    }
}