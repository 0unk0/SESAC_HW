const fs = require('fs');

const homedir = fs.readdir('.', (err, files) => {
    if (err) {
        console.error("오류가 발생했습니다.", err);
        return;
    }
    console.log("파일 목록: ", files);
    
});
console.log(homedir);