import { User } from "./HW10_user.js";
import { Store } from "./HW10_store.js";
import { Order } from "./HW10_order.js";
import { Item } from "./HW10_item.js";
import { OrderItem } from "./HW10_orderItem.js";

export function generateUsersData(numOfUsers){
    const usersListTypeCSV = ['Id,Name,Gender,Age,Birthdate,Address'];

    for(let i = 0; i < numOfUsers; i++){
        const user = new User();
        user.setUser();
        usersListTypeCSV.push(user.getUserTypeCSV());
    }

    return usersListTypeCSV.join('\n');
}

export function generateStoresData(numOfStores){
    const storesListTypeCSV = ['Id,Name,Type,Address'];

    for(let i = 0; i < numOfStores; i++){
        const store = new Store();
        store.setStore();
        storesListTypeCSV.push(store.getStoreTypeCSV());
    }

    return storesListTypeCSV.join('\n');
}

export function generateOrdersData(numOfOrders){    
    const ordersListTypeCSV = ['Id,OrderAt,StoreId,UserId'];

    for(let i = 0; i < numOfOrders; i++){
        const order = new Order();
        order.setOrder();
        ordersListTypeCSV.push(order.getOrderTypeCSV());
    }

    return ordersListTypeCSV.join('\n');
}

export function generateItemsData(numOfItems){
    const itemsListTypeCSV = ['Id,Name,Type,UnitPrice'];

    for(let i = 0; i < numOfItems; i++){
        const item = new Item();
        item.setItem();
        itemsListTypeCSV.push(item.getItemTypeCSV());
    }

    return itemsListTypeCSV.join('\n');
}

export function generateOrderItemsData(numOfOrderItems){
    const orderitemsList = ['Id,OrderId,ItemId'];

    for(let i = 0; i < numOfOrderItems; i++){
        const orderItem = new OrderItem();
        orderItem.setOrderItem();
        orderitemsList.push(orderItem.getOrderItemTypeCSV());
    }

    return orderitemsList.join('\n');
}