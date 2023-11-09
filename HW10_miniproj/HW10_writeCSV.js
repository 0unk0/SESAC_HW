import { writeFile } from 'node:fs';
import { userData } from "./HW10_user.js";
import { storeData } from "./HW10_store.js";
import { orderData } from "./HW10_order.js";
import { itemData } from "./HW10_item.js";
import { orderitemData } from "./HW10_orderItem.js";

export function writeCSV(csvName, data){
    writeFile(csvName, data, 'utf-8', (err) => {
        let fileName = csvName.substring(6);
        if(err){
            console.log(`${fileName} 파일 작성 실패`);
        }
    });
}

writeCSV('./csv/user.csv', userData(1000));
writeCSV('./csv/store.csv', storeData(100));

setTimeout(() => {
    writeCSV('./csv/order.csv', orderData(10000))
}, 1000);

writeCSV('./csv/item.csv', itemData(20));

setTimeout(() => {
    writeCSV('./csv/orderitem.csv', orderitemData(50000))
},2000);



