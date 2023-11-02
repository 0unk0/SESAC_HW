import {genericCal} from './HW8_calculator_generic.js';

export class programmingCal extends genericCal{
    leftShift(a, b){return a<<b};
    rightShift(a, b){return a>>b};
    and(a, b){return a>0 && b >0};
    or(a, b){return a > 0 || b > 0};
}

// const pC = new programmingCal();

// console.log(pC.leftShift(5,2));
// console.log(pC.rightShift(5,2));
// console.log(pC.and(3, -2));
// console.log(pC.or(3, -2));