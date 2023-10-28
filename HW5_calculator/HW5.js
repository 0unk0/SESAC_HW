var result = "";
error_flag=0;

function num(num) {
  i = result.length;

  if(error_flag===1){
    document.getElementById("result").value = "";
    result = "";
    error_flag=0;
  }

  // 끝에 "="이 붙어있으므로 연산 후의 값이고, 숫자가 클릭 된 상황이니까 모든 값 초기화
  if (result.substring(i - 1) === "=") {
    // result=result.slice(0, i-1);
    document.getElementById("result").value = "";
    result = "";
  }

  text = document.getElementsByClassName("num")[num].innerText;
  document.getElementById("result").value += text;
  result += text;
}



function cal(operator) {
  text = document.getElementsByClassName("operator")[operator].innerText;

  i = result.length;

  if (text === "=") {
    
    total = eval(result);

    console.log(total);
    if(total == Infinity || isNaN(total)){
      document.getElementById("result").value = "ERROR";
      error_flag=1;
    }
    else{
      document.getElementById("result").value = total;
      result = total + "="; // 연산 후 result에 =을 붙임
      console.log(result);
    }

  } 
  
  else if (text === "C") {
    document.getElementById("result").value = "";
    result = "";
  } 

  else if(error_flag===1 && (text ==="+" || text ==="*" || text ==="/")){
    document.getElementById("result").value = "ERROR";
    result = "";
  }
  
  else {

    if(error_flag===1){
      document.getElementById("result").value = "";
      result = "";
      error_flag=0;
    }
    // 연산자 반복 해결 // 연산자 반복되면 result에 있던 연산자 삭제 후 click한 연산자를 붙임
    if (
      result.substring(i - 1) === "+" ||
      result.substring(i - 1) === "-" ||
      result.substring(i - 1) === "*" ||
      result.substring(i - 1) === "/"
    ) {
      result = result.slice(0, i - 1);
      result += text;
      document.getElementById("result").value = result;
      return;
    }

    // 이어서 계산 해결 //  끝에 "="이 붙어있으므로 연산 후의 값이고, 연산자 클릭 된 상황이니까 끝에 붙은 "="" 삭제하고 이어서 계산
    if (result.substring(i - 1) === "=") {
      result = result.slice(0, i - 1);
      document.getElementById("result").value = result;
    }

    // 맨 처음에 "*" 또는 "/" 가 오면 삭제
    if ((text === "*" && result === "") || (text === "/" && result === "")) {
      document.getElementById("result").value = "";
      result = "";
      return;
    } else {
      result += text;
      document.getElementById("result").value += text;
    }
  }
}


