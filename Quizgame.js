var quangdb = dictionary;
function check(x, ans){
      if (x== 0 && ans =="A"){
      console.log("Right"); return true;}
      else if (x == 1 && ans == "B"){
      console.log("Right"); return true }
      else if (x == 2 && ans == "C"){
      console.log("Right"); return true;}
      else if (x == 3 && ans == "D"){
      console.log("Right"); return true;}
      else {console.log("Wrong"); return false;}
}
var arrqq = []; 
function learn(){
      var times = parseInt (window.prompt("Times?"));
      while (times-- > 0){
            var arr = [];
            for(var i = 0 ; i<4; i++)
            { arr.push(quangdb.aWordStartWith(String.fromCharCode(rand(97,122))));
            }
            var x = rand(0,3);
            arrqq.push(arr[x]);
            console.log("Nghia:" + quangdb.getMean(arr[x]));
            console.log("A: " + arr[0]);
            console.log("B: " + arr[1]);
            console.log("C: " + arr[2]);
            console.log("D: " + arr[3]);
            var ans = window.prompt(" ");
            check(x, ans); 
      }
}
learn();

function test(){
      var count =0;
      var times = parseInt (window.prompt("Times?"));
      var timess = times;
      while (times-- > 0){
            var arr = [];
            for(var i = 0 ; i<4; i++)
            { arr.push(arrqq[rand(0, arrqq.length-1)]);
            }
            var x = rand(0,3);
            console.log("Nghia:" + quangdb.getMean(arr[x]));
            console.log("A: " + arr[0]);
            console.log("B: " + arr[1]);
            console.log("C: " + arr[2]);
            console.log("D: " + arr[3]);
            var ans = window.prompt(" ");
            if(check(x, ans)) count++; 
      }
            console.log("Your point is " + count + "/" + timess);
            
}


var maximum =0;
function challenge(){
      var count =0;
      var times = 3;
      
      while (times > 0){
            var arr = [];
            for(var i = 0 ; i<4; i++)
            { arr.push(quangdb.aWordStartWith(String.fromCharCode(rand(97,122))));
            }
            var x = rand(0,3);
            console.log("Nghia:" + quangdb.getMean(arr[x]));
            console.log("A: " + arr[0]);
            console.log("B: " + arr[1]);
            console.log("C: " + arr[2]);
            console.log("D: " + arr[3]);
            var ans = window.prompt(" ");
            if(check(x, ans)) count++;
            else times--; 
      }
            console.log("Your point is " + count);
            if (count < maximum){ maximum = count; 
            console.log("It's new record");
            }
            
}