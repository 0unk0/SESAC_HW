import {writeFile} from 'node:fs';
import {v4 as uuid} from 'uuid';
import { readCSV, splitID } from './HW10_data.js';

function orderId(orderIdList){
    return orderIdList[ Math.floor(Math.random() * orderIdList.length)];
}

function itemId(itemIdList){
    return itemIdList[ Math.floor(Math.random() * itemIdList.length)];
}

function orderitemData(){
    let orderitem = [];
    for(let i = 0; i < 50000; i++){
        orderitem.push({
            'Id': uuid(),
            'OrderId': orderId(orderIdList),
            "ItemId": itemId(itemIdList)
        });
    }
    return orderitem;
}

function orderitemCSV(orderitem){ // 함수 분리 -> 재사용 가능할둣,,,
    const orderitemData = orderitem.map(orderitem => `${orderitem.Id},${orderitem.OrderId},${orderitem.ItemId}`).join('\n'); 
    const header = 'Id,OrderId,ItemId\n';

    writeFile('orderitem.csv', header+orderitemData, 'utf-8', (err,data) => {
        if(err){
            console.log('orderitem.csv 작성 실패');
        }
    });
}

const orderIdList = splitID(readCSV('./order.csv'));
const itemIdList = splitID(readCSV('./item.csv'));
const orderitemList = orderitemData();
orderitemCSV(orderitemList);