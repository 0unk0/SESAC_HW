import {writeFile} from 'node:fs';
import {v4 as uuid} from 'uuid';
import { generatedate, readCSV, splitID } from './HW10_data.js';

function orderAt() {
    let date = generatedate();
    let hour = Math.floor(Math.random() * 24);
    let min = Math.floor(Math.random() * 60);
    let sec = Math.floor(Math.random() * 60);

    return `2023-${date} ${String(hour).padStart(2, 0)}:${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}`;
}

function storeId(storeIdList){
    return storeIdList[ Math.floor(Math.random() * storeIdList.length)];
}

function userId(userIdList){
    return userIdList[ Math.floor(Math.random() * userIdList.length)];
}

function orderData(){
    let order = [];
    for(let i = 0; i < 10000; i++){
        order.push({
            'Id': uuid(),
            'OrderAt': orderAt(),
            'StoreId': storeId(storeIdList),
            "UserId": userId(userIdList)
        });
    }
    return order;
}

function orderCSV(order){
    const orderData = order.map(order => `${order.Id},${order.OrderAt},${order.StoreId},${order.UserId}`).join('\n'); 
    const header = 'Id,OrderAt,StoreId,UserId\n';

    writeFile('order.csv', header+orderData, 'utf-8', (err,data) => {
        if(err){
            console.log('order.csv 작성 실패');
        }
    });
}

const storeIdList = splitID(readCSV('./store.csv'));
const userIdList = splitID(readCSV('./user.csv'));
const orderList = orderData();
orderCSV(orderList);