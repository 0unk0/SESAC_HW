import {v4 as uuid} from 'uuid';
import { generateAddress, generatedate, writeCSV } from './HW10_common.js';

const today = new Date();
const surnameList = ['김', '이', '박','최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권'];
const firstnameListM = ['민준', '서준', '도윤', '예준', '시우', '하준', '지호', '주원', '지후', '준우', '준서', '도현', '건우', '현우', '우진', '지훈', '선우', '유준', '서진', '연우'];
const firstnameListW = ['서윤', '서연', '지우', '서현', '하윤', '하은', '민서', '지유', '윤서', '채원', '수아', '지민', '지아', '지윤', '다은', '은서', '예은', '지안', '소율', '서아'];

function generateUserName(gender){
    let firstname = "";

    gender==="Male"
    ? firstname = firstnameListM[Math.floor(Math.random() * firstnameListM.length)]
    : firstname = firstnameListW[Math.floor(Math.random() * firstnameListW.length)];
    return `${surnameList[Math.floor(Math.random() * surnameList.length)]}${firstname}`;
}

function generateUserAge(){
    return Math.floor(Math.random() * 45) + 10;
}

function generateUserBirthdate(age){
    let year = today.getFullYear() - age + 1;
    let date = generatedate();
    return `${year}-${date}`;
}

function generateUserGender(){
    return`${Math.random() < 0.5 ? "Male" : "Female"}`;
}

function userData(){
    let user = [];

    for(let i = 0; i < 1000; i++){
        let gender = generateUserGender();
        let age = generateUserAge();
        user.push(
            {Id : uuid(), 
            Name: generateUserName(gender),
            Gender: gender,
            Age: age,
            Birthdate: generateUserBirthdate(age),
            Address: generateAddress()}
        );
    }
    return user;
}

const header = 'Id,Name,Gender,Age,Birthdate,Address\n';
const user = userData();
const Data = user.map(user => `${user.Id},${user.Name},${user.Gender},${user.Age},${user.Birthdate},${user.Address}`).join('\n'); 

writeCSV('./csv/user.csv', header, Data);