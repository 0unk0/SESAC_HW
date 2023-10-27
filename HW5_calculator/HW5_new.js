var result = "";

function num(num) {
  document.getElementById("result").value += num;
  result += num;
  console.log(result);
}

// function num(num) {
//   i = result.length;

//   // 끝에 "="이 붙어있으므로 연산 후의 값이고, 숫자가 클릭 된 상황이니까 모든 값 초기화
//   if (result.substring(i - 1) === "=") {
//     // result=result.slice(0, i-1);
//     document.getElementById("text").value = "";
//     result = "";
//   }

//   text = document.getElementsByClassName("num")[num].innerText;
//   document.getElementById("text").value += text;
//   result += text;
// }

function cal(operator){

  if(operator==="C"){
    document.getElementById("result").value = "";
    result = "";
  }
  
  else{
    document.getElementById("result").value += operator;
    result+=operator;
    console.log(result);
  }
}

// function cal(operator) {
//   text = document.getElementsByClassName("operator")[operator].innerText;

//   i = result.length;

//   if (text === "=") {
    
//     total = eval(result);

//     console.log(total);
//     if(total == Infinity){
//       document.getElementById("text").value = "NaN";
//     }
//     else{
//       document.getElementById("text").value = total;
//       result = total + "="; // 연산 후 result에 =을 붙임
//       console.log(result);
//     }

//   } 
  
//   else if (text === "C") {
//     document.getElementById("text").value = "";
//     result = "";
//   } 
  
//   else {
//     // 연산자 반복 해결 // 연산자 반복되면 result에 있던 연산자 삭제 후 click한 연산자를 붙임
//     if (
//       result.substring(i - 1) === "+" ||
//       result.substring(i - 1) === "-" ||
//       result.substring(i - 1) === "*" ||
//       result.substring(i - 1) === "/"
//     ) {
//       result = result.slice(0, i - 1);
//       result += text;
//       document.getElementById("text").value = result;
//       return;
//     }

//     // 이어서 계산 해결 //  끝에 "="이 붙어있으므로 연산 후의 값이고, 연산자 클릭 된 상황이니까 끝에 붙은 "="" 삭제하고 이어서 계산
//     if (result.substring(i - 1) === "=") {
//       result = result.slice(0, i - 1);
//       document.getElementById("text").value = result;
//     }

//     // 맨 처음에 "*" 또는 "/" 가 오면 삭제
//     if ((text === "*" && result === "") || (text === "/" && result === "")) {
//       document.getElementById("text").value = "";
//       result = "";
//       return;
//     } else {
//       result += text;
//       document.getElementById("text").value += text;
//     }
//   }
// }


