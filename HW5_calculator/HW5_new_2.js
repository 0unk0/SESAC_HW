temp = "";
number = [];
operator = [];
count=0;
minus=0;

function num(n) {
  // 연산된 결과값 있을 경우 초기화
  if(number.length===1 && operator.length===0){
    document.getElementById("result").value = n;
    temp = n;
    number[0]=parseInt(temp);
  }
  else{
    document.getElementById("result").value += n;
    temp += n;
    number[count]=parseInt(temp);
  }
}

function cal(o){
  count++;
  
  if(minus===1){
    number[0]*= -1;
    minus=0;
  }

  console.log(number.length);
  console.log(operator.length);

  // 초기화 버튼
  if(o==="C"){
    document.getElementById("result").value = "";
    number.length=0;
    operator.length=0;
    temp="";
    console.log(number);
    console.log(operator);
  }

  //결과 계산 버튼
  else if(o==="="){
    // 아무것도 안눌렸을 때
    if(number.length===0){
      document.getElementById("result").value = "";
    }

    // 숫자만 누르고 = 누를 때
    else if(number.length===1 && operator.length===0){
      document.getElementById("result").value = number;
      total=number[0];
      number.length=0;
      operator.length=0;
      number[0]= total;
      count=0;
    }

    else{
      console.log(number);
      first(number,operator);
      
      // 나누기 0일 때
      if(number[0]===Infinity){
        document.getElementById("result").value = "ERROR";
        number.length=0;
        operator.length=0;
      }

      else{
        document.getElementById("result").value = number;
        total=number[0];
        number.length=0;
        operator.length=0;
        number[0]= total;
        count=0;
      }
    }
  }
  
  // 연산자 버튼
  else{
    //연산자 중복시
    if(number.length>0 && number.length<=operator.length){
      operator[operator.length-1]=o;
      count--;
    }

    //마이너스로 시작
    else if(number.length===0 && o==="-"){
      document.getElementById("result").value = o;
      minus = 1;
      count--;
    }
    
    //마이너스로 시작 + 중복
    // else if(minus=1){
    //   document.getElementById("result").value += o;
    //   count--;
    //   minus=0;
    // }

    else{
      document.getElementById("result").value += o;

      operator.push(o);
    
      temp = ""; // 숫자 새로 받기 위함
      console.log(number);
      console.log(operator);
    }

  }



  
}


// 곱셈, 나눗셈 제거
function first(number, operator){
  console.log("곱셈, 나눗셈 제거");

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
  console.log("최종 연산");

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
  console.log(number); 
  console.log(operator); 
}