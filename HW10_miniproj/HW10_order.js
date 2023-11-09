import { v4 as uuid } from 'uuid';
import { generatedate, readId, getId } from './HW10_common.js';

function orderAt() {
    let date = generatedate();
    let hour = Math.floor(Math.random() * 24);
    let min = Math.floor(Math.random() * 60);
    let sec = Math.floor(Math.random() * 60);
    return `2023-${date} ${String(hour).padStart(2, 0)}:${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}`;
}

export function orderData(count){
    const storeIdList = readId('./csv/store.csv');
    const userIdList = readId('./csv/user.csv');
    
    let order = ['Id,OrderAt,StoreId,UserId'];
    for(let i = 0; i < count; i++){
        const Id = uuid();
        const OrderAt = orderAt();
        const StoreId = getId(storeIdList);
        const UserId = getId(userIdList);
        order.push(`${Id},${OrderAt},${StoreId},${UserId}`);
    }
    return order.join('\n');
}