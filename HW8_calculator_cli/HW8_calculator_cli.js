import {genericCal} from './HW8_calculator_generic.js';
import {engineeringCal} from './HW8_calculator_engineering.js';
import {programmingCal} from './HW8_calculator_programmer.js';

// const readline = require('readline');

import { createInterface } from 'readline';
const rl = createInterface({
    input: process.stdin, 
    output: process.stdout, 
});

rl.question("Select Calculator Mode:\n1. Engineering Calculator\n2. Standard Calculaot\n3. Programmer Calculator\nEnter the mode (1/2/3) : ", (input) => { 
    const mode = parseInt(input);
    if(mode > 3 || mode < 1 || typeof mode !== "number"){ 
        console.log("입력 오류");
        rl.close();
    } else{
        rl.question("Enter first number: ", (input) => { // 첫번째 숫자 입력 받기
            const num1 = parseInt(input);
            rl.question("Enter operator (+, -, *, /): ", (input) => { // 연산자 입력 받기
                const operator = input;
                if(operator !== '+' && operator !== '-' && operator !== '*' && operator && '/' ){
                    console.log("입력 오류")
                    rl.close();  
                } else{
                    rl.question("Enter second number: ", (input) => { // 두번째 숫자 입력 받기
                        const num2 = parseInt(input);
                        
                        switch(mode){
                            case 1:
                                const genericCalculator = new genericCal();
                                cal(genericCalculator,operator, num1, num2);
                                break;
                            case 2:
                                const engineeringCalculator = new engineeringCal(); 
                                cal(engineeringCalculator, operator, num1, num2);
                                break;
                            case 3:
                                const programmingCalculator = new programmingCal();
                                cal(programmingCalculator, operator, num1, num2);
                                break;
                        }
                        rl.close();
                    });
                }
            });
        });
    }   
});

function cal(cal, op, num1, num2){
    switch(op){
        case "+":
            console.log("Result: " + cal.add(num1, num2));
            break;
        case "-":
            console.log("Result: " + cal.sub(num1, num2));
            break;
        case "*":
            console.log("Result: " + cal.mul(num1, num2));
            break;
        case "/":
            console.log("Result: " + cal.div(num1, num2));
            break;
    }
}