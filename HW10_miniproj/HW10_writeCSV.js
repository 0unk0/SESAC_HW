import { writeFile } from 'node:fs';
import { generateUsers, generateStores, generateOrders, generateItems, generateOrderItems } from "./HW10_generateDataForCSV.js";

function writeCSV(csvName, data){
    writeFile('./csv/'+csvName, data, 'utf-8', (err) => {
        if(err){
            console.log(`${csvName} 파일 작성 실패`);
        }
    });
}

writeCSV('user.csv',generateUsers(1000));
writeCSV('store.csv',generateStores(100));
setTimeout(() => {
    writeCSV('order.csv',generateOrders(10000));
}, 1000);
writeCSV('item.csv',generateItems(20));
setTimeout(() => {
    writeCSV('orderitem.csv',generateOrderItems(50000));   
},3000);

