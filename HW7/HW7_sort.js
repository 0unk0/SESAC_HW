list = [4, 2, 7, 1, 9, 5];

function sort(list){
    for (let i = 0; i < list.length; i++){
        min = list[i];
        for(let j = i+1; j < list.length; j++){
            if(list[j] < min){
                min = list[j];
                list[j] = list[i];
                list[i] = min;
            }
        }
    }
    return list;
}

console.log(sort(list));