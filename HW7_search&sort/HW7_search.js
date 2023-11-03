list = [4, 2, 7, 1, 9, 5];

function search(value){
    for(let i = 0; i < list.length; i++){
        if(list[i] === value){
            return `찾으려는 숫자:${value}, index: ${i}`;
        }
    }
    return `찾으려는 숫자: ${value}, 존재하지 않습니다`;
}

console.log(search(4));
console.log(search(3));