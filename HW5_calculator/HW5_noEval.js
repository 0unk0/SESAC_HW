number = [0]; // 숫자 리스트
operator = []; // 연산자 리스트
temp = ""; // 숫자 받기 & 연산자 중복 여부
count=0; // 리스트 접근 & 시작 여부 확인
error_flag=0; // 에러 여부

document.getElementById("result").value = 0;

function num(n) {
  if(error_flag!==1){
    temp += n;
    number[count]=parseInt(temp);

    count===0 && operator.length===0
      ? document.getElementById("result").value = n
      : document.getElementById("result").value += n;
  }
}

function op(o){
  if(error_flag!==1){
    count++;

    //연산자 중복시
    if(number.length<=operator.length){
      duplicateOp(o);
    }
    else{
      document.getElementById("result").value += o;
      operator.push(o);
      temp = ""; // 숫자 새로 받기 위함
    }
  }
}

function duplicateOp(o){
  count--;
  // 곱하기, 나누기 뒤 마이너스 가능
  if(temp==="" && ((operator[operator.length-1]==="*"&& o==="-") || (operator[operator.length-1]==="/" && o==="-"))){
    document.getElementById("result").value += o;
    temp = "-";
  } 
  else{
    overlap=document.getElementById("result").value;
    overlap=overlap.substring(0,overlap.length-1); 

    //  곱하기, 나누기 뒤 마이너스 뒤 마이너스
    if(temp==="-"&& o==="-"){
      temp="";
    } 
    // 곱하기, 나누기 뒤 마이너스 뒤 다른 연산자
    else if(temp==="-" & o !== "-"){
      return
    }
    // 그냥 연산자 중복
    else{
      operator[operator.length-1]=o;
      overlap+=o;
    }
    document.getElementById("result").value=overlap; //
  }
}

// 계산 버튼 
function result(){
  // 연산자로 끝나지 않았다면
  if(number.length!==operator.length){ 
    evaluation(number,operator); //계산 함수 호출

    // 나누기 0일 때
    if(number[0]===Infinity|| number[0]=== -Infinity || isNaN(number[0])){
      document.getElementById("result").value = "ERROR";
      dataClear();
      error_flag=1;
    }
    else{
      document.getElementById("result").value = number;
      total=number[0];
      dataClear();
      number[0]= total;
    }
  }
}

// 곱셈, 나눗셈 제거
function evaluation(number, operator){
  // *,/ 처리
  for(i=0; i<number.length; i++){
    if(operator[i]==='*'){
      number[i] *= number[i+1];
      number.splice(i+1,1);
      operator.splice(i,1);
      i--;
    }
    else if(operator[i]==='/'){
      number[i] /= number[i+1];
      number.splice(i+1,1);
      operator.splice(i,1);
      i--;
    }
  }

  // console.log("곱셈, 나눗셈 제거 결과");
  // console.log(number);
  // console.log(operator);
  
  // +,- 처리
  if(number.length>1){
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
}

// 초기화 버튼
function clearDisplay(){
  document.getElementById("result").value = 0;
  dataClear();
  number[0]=0;
  error_flag=0;
}

// 값 초기화
function dataClear(){
  number.length=0;
  operator.length=0; 
  temp="";
  count=0; 
}