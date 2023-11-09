import { v4 as uuid } from 'uuid';
import { generateType } from './HW10_common.js'

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

export function itemData(count){
    let item = ['Id,Name,Type,UnitPrice'];
    for(let i = 0; i < count; i++){
        const Type = generateType(typeList);
        const Name = generateItemName(Type);
        const Id = uuid();
        const UnitPrice = price[Name];
        item.push(`${Id},${Name},${Type},${UnitPrice}`);
    }
    return item.join('\n');
}