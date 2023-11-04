import {writeFile} from 'node:fs';
import {v4 as uuid} from 'uuid';

const today = new Date();
const surnameList = ['김', '이', '박','최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권'];
const firstnameListM = ['민준', '서준', '도윤', '예준', '시우', '하준', '지호', '주원', '지후', '준우', '준서', '도현', '건우', '현우', '우진', '지훈', '선우', '유준', '서진', '연우'];
const firstnameListW = ['서윤', '서연', '지우', '서현', '하윤', '하은', '민서', '지유', '윤서', '채원', '수아', '지민', '지아', '지윤', '다은', '은서', '예은', '지안', '소율', '서아'];
const cities = ['서울', '대전', '대구', '부산', '인천'];
const gu_su = ['강남구', '강북구', '관악구', '구로구', '금천구', '영등포구', '마포구', '동작구', '용산구', '송파구'];
const gu_dj = ['동구', '중구', '서구', '유성구', '대덕구'];
const gu_dg = ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구'];
const gu_bs = ['강서구', '남구', '동구', '북구', '부산진구', '수영구' , '연제구', '영도구' ,'중구' ,'해운대구'];
const gu_ic = ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구']

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

function generateAddress(){
    let city_num = Math.floor(Math.random() * cities.length);
    let gu="";
    let road = Math.random() < 0.5 ? "길" : "로";
    let addr1 = Math.floor(Math.random() * 90);
    let addr2 = Math.floor(Math.random() * 90);

    switch(city_num){
        case 0:
            gu = gu_su[Math.floor(Math.random()*gu_su.length)];
            break;
        case 1:
            gu = gu_dj[Math.floor(Math.random()*gu_dj.length)];
            break;
        case 2:
            gu = gu_dg[Math.floor(Math.random()*gu_dg.length)];
            break;
        case 3:
            gu = gu_bs[Math.floor(Math.random()*gu_bs.length)];
            break;
        case 4:
            gu = gu_ic[Math.floor(Math.random()*gu_ic.length)];
            break;
    }
    return `${cities[city_num]} ${gu} ${addr1}${road} ${addr2}`;
}

function userData(){
    let user = [];

    for(let i = 0; i < 1000; i++){
        let gender = generateGender();
        let Age = generateAge();
        user.push(
            {id : uuid(), 
            name: generateName(gender),
            gender: gender,
            age: Age,
            birthdate: generateBirthdate(Age),
            address: generateAddress()}
        );
    }
    return user;
}

function userCSV(user){
    const userData = user.map(user => `${user.id},${user.name},${user.gender},${user.age},${user.birthdate},${user.address}`).join('\n'); 
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