import {writeFile} from 'node:fs';
import {v4 as uuid} from 'uuid';

import { generateAddress } from './HW10_data_addr.js';

const today = new Date();
const surnameList = ['김', '이', '박','최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권'];
const firstnameListM = ['민준', '서준', '도윤', '예준', '시우', '하준', '지호', '주원', '지후', '준우', '준서', '도현', '건우', '현우', '우진', '지훈', '선우', '유준', '서진', '연우'];
const firstnameListW = ['서윤', '서연', '지우', '서현', '하윤', '하은', '민서', '지유', '윤서', '채원', '수아', '지민', '지아', '지윤', '다은', '은서', '예은', '지안', '소율', '서아'];


function generateName(gender){
    let firstname = "";

    gender==="Male"
    ? firstname = firstnameListM[Math.floor(Math.random() * firstnameListM.length)]
    : firstname = firstnameListW[Math.floor(Math.random() * firstnameListW.length)];

    return `${surnameList[Math.floor(Math.random() * surnameList.length)]}${firstname}`;
}

function generateAge(){
    return Math.floor(Math.random() * 45) + 10;
}

function generateBirthdate(age){
    let year = today.getFullYear() - age + 1;
    let month = Math.floor(Math.random() * 11) + 1;
    let day = 0;
    
    [1, 3, 5, 7, 8, 10, 12].includes(month)
    ? day = Math.floor(Math.random() * 30) + 1
    : [4, 6, 9, 11].includes(month)
        ? day = Math.floor(Math.random() * 29) + 1
        : day = Math.floor(Math.random() * 27) + 1 ;

    return `${year}-${String(month).padStart(2, 0)}-${String(day).padStart(2,0)}`;
}

function generateGender(){
    return`${Math.random() < 0.5 ? "Male" : "Female"}`;
}


function userData(){
    let user = [];

    for(let i = 0; i < 1000; i++){
        let gender = generateGender();
        let age = generateAge();
        user.push(
            {Id : uuid(), 
            Name: generateName(gender),
            Gender: gender,
            Age: age,
            Birthdate: generateBirthdate(age),
            Address: generateAddress()}
        );
    }
    return user;
}

function userCSV(user){
    const userData = user.map(user => `${user.Id},${user.Name},${user.Gender},${user.Age},${user.Birthdate},${user.Address}`).join('\n'); 
    const header = 'Id,Name,Gender,Age,Birthdate,Address\n';

    writeFile('user.csv', header+userData, 'utf-8', (err) => {
        if(err){
            console.log("user.csv 파일 작성 실패");
        } else{
            console.log("user.csv 파일 작성 성공");
        }
    });
}

let userList = userData();
userCSV(userList);