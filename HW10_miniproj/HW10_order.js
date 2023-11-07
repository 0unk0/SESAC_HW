import {v4 as uuid} from 'uuid';
import { generatedate, readId, getId, writeCSV } from './HW10_common.js';

function orderAt() {
    let date = generatedate();
    let hour = Math.floor(Math.random() * 24);
    let min = Math.floor(Math.random() * 60);
    let sec = Math.floor(Math.random() * 60);
    return `2023-${date} ${String(hour).padStart(2, 0)}:${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}`;
}

function orderData(){
    const storeIdList = readId('./csv/store.csv');
    const userIdList = readId('./csv/user.csv');

    let order = [];
    for(let i = 0; i < 10000; i++){
        order.push({
            'Id': uuid(),
            'OrderAt': orderAt(),
            'StoreId': getId(storeIdList),
            "UserId": getId(userIdList)
        });
    }
    return order;
}

const header = 'Id,OrderAt,StoreId,UserId\n';
const order = orderData();
const Data = order.map(order => `${order.Id},${order.OrderAt},${order.StoreId},${order.UserId}`).join('\n'); 

writeCSV('./csv/order.csv', header, Data);