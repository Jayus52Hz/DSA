var quangdb = dictionary;
var timesChallenge = 3;
function check(x, ans) {
      if (x== 0 && ans =="A") return true;
      else if (x == 1 && ans == "B") return true;
      else if (x == 2 && ans == "C") return true;
      else if (x == 3 && ans == "D") return true;
      else return false;
}
var arrqq = []; 
var times = 0;
var x;
var arr = [];
var maximum =0;
var count = 0;
function showUserInput() {
      document.getElementById("user-reply").style.display = "block";
      document.getElementById("submit-button").style.display = "block";
  }
function resetPractice(){
      document.getElementById("practice-container").textContent = '';
}
function createQuestion(){
      arr = [];
      for(var i = 0 ; i < 4; i++){
            if (modePractice == 3){
                        arr.push(arrqq[rand(0,arrqq.length)]);
            }        
            else                   
            {      
                  arr.push(quangdb.aWordStartWith(String.fromCharCode(rand(97,122))));
            }
      }
      x = rand(0,3);
      arrqq.push(arr[x]);
      addDivToContainer("Mean: " + quangdb.getMean(arr[x]) + " ?","practice-container","quesion");
      addDivToContainer("A: " + arr[0],"practice-container","choice");
      addDivToContainer("B: " + arr[1],"practice-container","choice");
      addDivToContainer("C: " + arr[2],"practice-container","choice");
      addDivToContainer("D: " + arr[3],"practice-container","choice");
}
function setTime(){
      times = parseInt (window.prompt("Ban muon choi bao nhieu lan ?"));
}
var modePractice = 1;

document.getElementById("user-reply").addEventListener("keydown",function(event){
      if (event.key == "Enter"){
            console.log(modePractice);
            var ans = document.getElementById("user-reply").value; 
            if (modePractice == 1){
                  if (times > 0)
                  {
                        if (ans != ""){
                              times--;
                              printResult(check(x,ans));
                              createQuestion();
                        }
                  }                  
                  if (times == 0) {
                        window.alert("End game!")
                        resetPractice();
                        learn();
                  }
            }
            else 
            if (modePractice == 2){
                  if (timesChallenge > 0){
                        if (ans!= ""){
                              var temp = check(x,ans);
                              count += temp;
                              timesChallenge += temp-1;
                              console.log(count,timesChallenge);
                              printResult(temp);
                              createQuestion();
                        }
                  }
                  if (timesChallenge == 0)
                  {
                        if (count > maximum) {
                              window.alert("You lost ! New record is " + count);
                              maximum = count;
                        }
                        else window.alert("You lost ! Your score is " + count);    
                        resetPractice();       
                  }     
            } 
            else if (modePractice ==3) {
                  if (times > 0)
                  {
                        if (ans != ""){
                              times--;
                              printResult(check(x,ans));
                              createQuestion();
                        }
                  }                  
                  if (times == 0){
                         window.alert("End game!");
                         resetPractice();}
            }
            document.getElementById("user-reply").value = '';
      }
});

function printResult(check){
      if (check) {
            addDivToContainer(arr[x] + " is correct", "practice-container", "correct");
      }
      else
      {
            addDivToContainer(arr[x] + " is wrong", "practice-container", "wrong");
      }
}
function test(){
      showUserInput();
      modePractice = 3;
      resetPractice();
      setTime();
      createQuestion();
}

function challenge(){
      showUserInput();
      count =0;
      modePractice = 2;

      timesChallenge = 3;
      window.alert("Ban duoc sai toi da " + timesChallenge);
      createQuestion();
}
function learn(){
      showUserInput();
      modePractice = 1;
      resetPractice();
      setTime();
      createQuestion();
}
//1: learn
//2: challenge
//3: test