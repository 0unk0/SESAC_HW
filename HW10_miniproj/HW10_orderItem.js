import { v4 as uuid } from 'uuid';
import { readId, getId } from './HW10_common.js';

export function orderitemData(count){
    const orderIdList = readId('./csv/order.csv');
    const itemIdList = readId('./csv/item.csv');

    let orderitem = ['Id,OrderId,ItemId'];
    for(let i = 0; i < count; i++){
        const Id = uuid();
        const OrderId = getId(orderIdList);
        const ItemId = getId(itemIdList);
        orderitem.push(`${Id},${OrderId},${ItemId}`);
    }
    return orderitem.join('\n');
}