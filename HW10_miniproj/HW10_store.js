import {writeFile} from 'node:fs';
import {v4 as uuid} from 'uuid';
import {generateAddress} from './HW10_data.js'

const typeList = ['스타벅스', '투썸플레이스', '이디야', '커피빈'];
const nameList = {
    "강남구": "강남",
    "동작구": "상도",
    "송파구": "잠실",
    "중구": "중앙로",
    "달서구": "이월드",
    "수영구": "광안리",
    "해운대구": "해운대",
    "연수구": "송도",
    "부평구": "부평",
}

function generateName(addr){
    let gu = addr.split(' ')[1];
    let name = nameList[gu];
    let num = Math.floor(Math.random()*10)+1;
    return ` ${name}${num}호점`;
}

function generateType(){
    return typeList[Math.floor(Math.random()*typeList.length)];
}

function storeData(){
    let store = [];

    for(let i = 0; i < 100; i++){
        let type = generateType();
        let addr = generateAddress();
        store.push(
            {Id: uuid(),
            Name: type+generateName(addr),
            Type: type,
            Address: addr}
        );
    };
    return store;
}

function storeCSV(store){
    const storeData = store.map(store => `${store.Id},${store.Name},${store.Type},${store.Address}`).join('\n');
    const header = 'Id,Name,Type,Address\n';

    writeFile('store.csv', header+storeData, 'utf-8', (err) => {
        if(err){
            console.log("store.csv 파일 작성 실패");
        }
    })
}

const storeList = storeData();
storeCSV(storeList);