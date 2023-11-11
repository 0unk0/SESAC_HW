import { writeFile } from 'node:fs';
import { generateUsersData, generateStoresData, generateOrdersData, generateItemsData, generateOrderItemsData } from "./HW10_generateDataForCSV.js";

function writeCSV(csvName, data){
    writeFile('./csv/'+csvName, data, 'utf-8', (err) => {
        if(err){
            console.log(`${csvName} 파일 작성 실패`);
        }
    });
}

writeCSV('user.csv',generateUsersData(1000));
writeCSV('store.csv',generateStoresData(100));
setTimeout(() => {
    writeCSV('order.csv',generateOrdersData(10000));
}, 1000);
writeCSV('item.csv',generateItemsData(20));
setTimeout(() => {
    writeCSV('orderitem.csv',generateOrderItemsData(50000));   
}, 3000);

