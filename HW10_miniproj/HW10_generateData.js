import { User } from "./HW10_user.js";
import { Store } from "./HW10_store.js";
import { Order } from "./HW10_order.js";
import { Item } from "./HW10_item.js";
import { OrderItem } from "./HW10_orderItem.js";
import { writeCSV } from "./HW10_common.js";

function generateUsers(numOfUsers){
    const usersListTypeCSV = ['Id,Name,Gender,Age,Birthdate,Address'];
    const user = new User();

    for(let i = 0; i < numOfUsers; i++){

        user.setUser();
        usersListTypeCSV.push(user.getUserTypeCSV());
    }
    
    writeCSV('user.csv', usersListTypeCSV.join('\n'));
}

function generateStores(numOfStores){
    const storesListTypeCSV = ['Id,Name,Type,Address'];
    const store = new Store();

    for(let i = 0; i < numOfStores; i++){
        store.setStore();
        storesListTypeCSV.push(store.getStoreTypeCSV());
    }

    writeCSV('store.csv', storesListTypeCSV.join('\n'));
}

function generateOrders(numOfOrders){    
    const ordersListTypeCSV = ['Id,OrderAt,StoreId,UserId'];
    const order = new Order();

    for(let i = 0; i < numOfOrders; i++){
        order.setOrder();
        ordersListTypeCSV.push(order.getOrderTypeCSV());
    }

    writeCSV('order.csv', ordersListTypeCSV.join('\n'));
}

function generateItems(numOfItems){
    const itemsListTypeCSV = ['Id,Name,Type,UnitPrice'];
    const item = new Item();

    for(let i = 0; i < numOfItems; i++){
        item.setItem();
        itemsListTypeCSV.push(item.getItemTypeCSV());
    }

    writeCSV('item.csv', itemsListTypeCSV.join('\n'));
}

function generateOrderItems(numOfOrderItems){
    const orderitemsList = ['Id,OrderId,ItemId'];
    const orderItem = new OrderItem();

    for(let i = 0; i < numOfOrderItems; i++){
        orderItem.setOrderItem();
        orderitemsList.push(orderItem.getOrderItemTypeCSV());
    }

    writeCSV('orderitem.csv', orderitemsList.join('\n'));
}

function generateData(){
    generateUsers(1000);
    generateStores(100);
    generateOrders(10000);
    generateItems(20);
    generateOrderItems(50000);
}

generateData();