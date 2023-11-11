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

export class Item{
    getItemTypeCSV(){
        return `${this.Id},${this.Name},${this.Type},${this.UnitPrice}`;
    }
    setItem(){
        this.Id = this.generateItemId();
        this.Item = this.chooseItem();
        this.Name = this.Item.Name;
        this.Type = this.Item.Type;
        this.UnitPrice = this.Item.Price;
    }

    generateItemId(){
        return uuid();
    }
    chooseItem(){
        const menuNum = Math.floor(Math.random()*menu.length);
        return menu[menuNum];
    }
}