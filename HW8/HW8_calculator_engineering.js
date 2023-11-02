import {genericCal} from './HW8_calculator_generic.js';

export class engineeringCal extends genericCal{
    sin(a){return Math.sin(a)};
    cos(a){return Math.cos(a)};
    tan(a){return Math.tan(a)};
    pow(x, y){return Math.pow(x, y)};
}

// const eC = new engineeringCal();

// console.log(eC.sin(45));
// console.log(eC.cos(45));
// console.log(eC.tan(45));
// console.log(eC.pow(2,3));