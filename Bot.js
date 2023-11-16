class Bot{
    constructor(name,level,dictionary){
        this.name = name;
        this.level = level;
        this.brain = dictionary;
    }
    aWord(c){
        return this.brain.aWordStartWith(c);
    }
}