import { v4 as uuid } from 'uuid';
import { readId, getId } from './HW10_common.js';

const orderIdList = readId('./csv/order.csv');
const itemIdList = readId('./csv/item.csv');

export class OrderItem{
    getOrderItemTypeCSV(){
        return `${this.Id},${this.OrderId},${this.ItemId}`;
    }
    setOrderItem(){
        this.Id = this.generateOrderItemId();
        this.OrderId = this.readOrderId(orderIdList);
        this.ItemId = this.readItemId(itemIdList);
    }

    generateOrderItemId(){
        return uuid();
    }
    readOrderId(orderIdList){
        return getId(orderIdList);
    }
    readItemId(itemIdList){
        return getId(itemIdList);
    }
}