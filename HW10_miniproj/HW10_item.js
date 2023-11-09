import { v4 as uuid } from 'uuid';

const menu = [{
        "Name": "Americano",
        "Type": "Coffee",
        "Price": "3000"
    },
    {
        "Name": "Espresso",
        "Type": "Coffee",
        "Price": "2500"
    },
    {
        "Name": "Latte",
        "Type": "Coffee",
        "Price": "3500"
    },
    {
        "Name": "Orange juice",
        "Type": "Juice",
        "Price": "4500"
    },
    {
        "Name": "Mango juice",
        "Type": "Juice",
        "Price": "4500"
    },
    {
        "Name": "Strawberry cake",
        "Type": "Cake",
        "Price": "6000"
    },
    {
        "Name": "Orange juice",
        "Type": "Cake",
        "Price": "5500"
    },
]

function generateItem(){
    const num = Math.floor(Math.random()*menu.length);
    return menu[num];
}

export function itemData(count){
    let item = ['Id,Name,Type,UnitPrice'];

    for(let i = 0; i < count; i++){
        const Id = uuid();
        const Item = generateItem();
        const Name = Item.Name;
        const Type = Item.Type;
        const UnitPrice = Item.Price;
        item.push(`${Id},${Name},${Type},${UnitPrice}`);
    }
    return item.join('\n');
}