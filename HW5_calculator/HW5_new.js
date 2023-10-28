number = "";
list = [];
count=0;

// document.getElementById("result").value=0;
function num(num) {
  document.getElementById("result").value += num;
  number += num;
}

function cal(operator){
  count++;
  // 초기화 버튼
  if(operator==="C"){
    document.getElementById("result").value = "";
    list.length=0;
    number="";
    console.log(list);
  }

  //결과 계산 버튼
  else if(operator==="="){

    if(list.length===0){
      document.getElementById("result").value = "";
    }
    else{
      list.push(parseInt(number));
      console.log(list);
      first(list);
  
      if(list[0]===Infinity){
        document.getElementById("result").value = "ERROR";
        list.length=0;
      }
      else{
        document.getElementById("result").value = list;
      }
    }
  }
  


  // 연산자 버튼
  else{
    document.getElementById("result").value += operator;

    list.push(parseInt(number)); //숫자 덩어리로 받기위해 여기서 parse 함
    list.push(operator);
  
    number = ""; // 숫자 새로 받기 위함
    console.log(list);
  }

  // if(list[-1]==="+" || list[-1]==="-" || list[-1]==="*" || list[-1]==="/"){
  //   list.splice(list.length-3, 2, operator); 
  //  }

  
}


// 곱셈, 나눗셈 제거
function first(list){
  console.log("sum함수 시작");

  for(i=0; i<list.length; i++){
    if(list[i]==='*'){
      list[i-1] *= list[i+1];
      list.splice(i,2);
      i--;
    }
    else if(list[i]==='/'){
      list[i-1] /= list[i+1];
      list.splice(i,2);
      i--;
    }
  }
  console.log(list);

  if(list.length>1){
    second(list);
  }
}

//최종 연산
function second(list){
  for(j=0; j<list.length; j++){
    if(list[j]==='+'){
      list[j-1] += list[j+1];
      list.splice(j,2);
      j--;
    }
    else if(list[j]==='-'){
      list[j-1] -= list[j+1];
      list.splice(j,2);
      j--;
    }
  }
  console.log(list); 
}