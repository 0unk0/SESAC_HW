import {v4 as uuid} from 'uuid';
import {generateType, writeCSV} from './HW10_common.js'

const typeList = ['Coffee', 'Juice', 'Cake'];
const item_coffee = ['Americano', 'Espresso', 'Latte'];
const item_juice = ['Orange juice', 'Mango juice'];
const item_cake = ['Strawberry cake', 'Chocolate cake'];
const price = {
    'Americano' : 3000,
    'Espresso' : 2500,
    'Latte' : 3500,
    'Orange juice': 4500,
    'Mango juice' : 4500,
    'Strawberry cake' : 6000,
    'Chocolate cake': 5500
};

function generateItemName(type){
    let item = '';
    switch(type){
        case 'Coffee':
            item = item_coffee[Math.floor(Math.random()* item_coffee.length)];
            break;
        case 'Juice':
            item = item_juice[Math.floor(Math.random()* item_juice.length)];
            break;
        case 'Cake':
            item = item_cake[Math.floor(Math.random()* item_cake.length)];
            break;
    }
    return item;
}

function itemData(){
    let item = [];
    for(let i = 0; i < 20; i++){
        let itemType = generateType(typeList);
        let itemName = generateItemName(itemType);
        item.push({
            'Id': uuid(),
            'Name': itemName,
            'Type': itemType,
            "UnitPrice": price[itemName]
        });
    }
    return item;
}

const header = 'Id,Name,Type,UnitPrice\n';
const item = itemData();
const Data = item.map(item => `${item.Id},${item.Name},${item.Type},${item.UnitPrice}`).join('\n');

writeCSV('./csv/item.csv', header, Data);