number = [0];
operator = [];

temp = ""; // 연산자 입력 전까지의 숫자 저장
count=0; // 리스트 접근

flag=1; // 맨처음이면 숫자 초기화
error_flag=0;

document.getElementById("result").value = 0;

function num(n) {
  //맨 처음 숫자 초기화
  if(flag===1 && operator.length===0){
    document.getElementById("result").value = n;
    temp += n;
    number[count]=parseInt(temp);
  }

  else if(error_flag===1){
    document.getElementById("result").value = n;
    number.length=0;
    temp="";
    count=0;
    temp += n;
    number[count]=parseInt(temp);

    error_flag=0;
  }

  else{
    //연산 후 재시작
    document.getElementById("result").value += n;
    temp += n;
    number[count]=parseInt(temp);
  }
}

function cal(o){
  flag=0;
  count++;

  // 초기화 버튼
  if(o==="C"){
    document.getElementById("result").value = 0;
    number.length=0;
    operator.length=0;
    number[0]=0;
    temp="";
    count=0;
    flag=1;  
    error_flag=0;
  }

  //결과 계산 버튼
  else if(o==="="){
    first(number,operator);

    console.log(number);
    // 나누기 0일 때
    if(number[0]===Infinity || isNaN(number[0])){
      document.getElementById("result").value = "ERROR";
      number.length=0;
      operator.length=0;
      error_flag=1;
    }

    else{
      document.getElementById("result").value = number;
      total=number[0];
      number.length=0;
      operator.length=0;
      number[0]= total;
      temp="";
      count=0;
      flag=1;
    }
  }

  else if(error_flag===1){
    document.getElementById("result").value = "ERROR";
    number.length=0;
    operator.length=0;
    error_flag=1;
  }

  
  // 연산자 버튼
  else{
    //연산자 중복시
    if(number.length>0 && number.length<=operator.length){
      operator[operator.length-1]=o;
      count--;
    }
    else{
      document.getElementById("result").value += o;

      operator.push(o);
    
      temp = ""; // 숫자 새로 받기 위함
    }
  }
}


// 곱셈, 나눗셈 제거
function first(number, operator){
  console.log("곱셈, 나눗셈 제거 결과");

  for(i=0; i<number.length; i++){
    if(operator[i]==='*'){
      number[i] *= number[i+1];
      number.splice(i+1,1);
      operator.splice(i,1);
    }
    else if(operator[i]==='/'){
      number[i] /= number[i+1];
      number.splice(i+1,1);
      operator.splice(i,1);
    }
  }
  console.log(number);
  console.log(operator);

  if(number.length>1){
    second(number, operator);
  }
}

//최종 연산
function second(number, operator){
  console.log("최종 연산 결과");

  for(j=0; j<number.length; j++){
    if(operator[j]==='+'){
      number[j] += number[j+1];
      number.splice(j+1,1);
      operator.splice(j,1);

      j--;
    }
    else if(operator[j]==='-'){
      number[j] -= number[j+1];
      number.splice(j+1,1);
      operator.splice(j,1);
      j--;
    }
  }
}