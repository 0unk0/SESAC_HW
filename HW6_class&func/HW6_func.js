numbers = [10, -20, 40, 1, 15];

function Max(numbers){
    max = numbers[0];
    for(let i = 0; i < numbers.length; i++){
        if(max<numbers[i]){
            max = numbers[i];
        }
    }
    return max;
}

function Min(numbers){
    min = numbers[0];
    for(let i = 0; i < numbers.length; i++){
        if(min>numbers[i]){
            min = numbers[i];
        }
    }
    return min;
}

function Avg(numbers){
    total = 0;
    for(let i = 0; i < numbers.length; i++){
        total += numbers[i];
    }
    avg = total / numbers.length;
    return avg;
}

max = Max(numbers);
min = Min(numbers);
avg = Avg(numbers);
console.log(`max: ${max}`);
console.log(`min: ${min}`);
console.log(`avg: ${avg}`);
