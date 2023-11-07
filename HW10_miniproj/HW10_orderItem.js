import {v4 as uuid} from 'uuid';
import { readCSV, splitID, getId, writeCSV } from './HW10_common.js';

function orderitemData(){
    const orderIdList = splitID(readCSV('./csv/order.csv'));
    const itemIdList = splitID(readCSV('./csv/item.csv'));

    let orderitem = [];
    for(let i = 0; i < 50000; i++){
        orderitem.push({
            'Id': uuid(),
            'OrderId': getId(orderIdList),
            "ItemId": getId(itemIdList)
        });
    }
    return orderitem;
}

const header = 'Id,OrderId,ItemId\n';
const orderitem = orderitemData();
const Data = orderitem.map(orderitem => `${orderitem.Id},${orderitem.OrderId},${orderitem.ItemId}`).join('\n'); 

writeCSV('./csv/orderitem.csv', header, Data);