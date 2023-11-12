import { v4 as uuid } from 'uuid';
import { generatedate, readId, getId } from './HW10_common.js';

export class Order{
    storeIdList = readId('./csv/store.csv');
    userIdList = readId('./csv/user.csv');

    getOrderTypeCSV(){
        return `${this.Id},${this.OrderAt},${this.StoreId},${this.UserId}`;
    }
    setOrder(){
        this.Id = this.generateOrderId();
        this.OrderAt = this.generateOrderAt();
        this.StoreId = this.readStoreId(this.storeIdList);
        this.UserId = this.readUserId(this.userIdList);
    }

    generateOrderId(){
        return uuid();
    }
    generateOrderAt() {
        const date = generatedate();
        const hour =String(Math.floor(Math.random() * 24)).padStart(2, "0");
        const min = String(Math.floor(Math.random() * 60)).padStart(2, "0");
        const sec = String(Math.floor(Math.random() * 60)).padStart(2, "0");

        return `2023-${date} ${hour}:${min}:${sec}`;
    }
    readStoreId(storeIdList){
        return getId(storeIdList);
    }
    readUserId(userIdList){
        return getId(userIdList);
    }
}