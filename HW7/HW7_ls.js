// const fs = require('fs');

// const homedir = fs.readdir('./', (err, files) => {
//     if (err) {
//         console.error("오류가 발생했습니다.", err);
//         return;
//     }
//     console.log("파일 목록: ", files);
    
// });
// console.log(homedir);


const fs = require('fs');
const path = require('path');

const directoryPath = "./";

const homedir = fs.readdir('./', (err, files) => {
    if (err) {
        console.error("오류가 발생했습니다.", err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        console.log('파일: ', filePath);
    })

    
});
console.log(homedir);

