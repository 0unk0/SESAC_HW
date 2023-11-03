
const fs = require('fs');
const path = require('path');

const directoryPath = ".";

const homedir = fs.readdir('.', (err, files) => {
    if (err) {
        console.error("오류가 발생했습니다.", err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        console.log('파일: ', filePath);
        // checkFile(filePath); // 여기서 처리하도록 해놨지만 실제로는 os에서 처리하느라 맨 뒤에 찍히는 거임
        checkFileSync(filePath); 
    })

    
});

function checkFile(filePath){ 
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error('파일 정보를 가져오는 중 오류가 발생했습니다.', err);
            return;
        }

        if(stats.isFile()){
            console.log('이것은 파일입니다.');
        } 
        else if(stats.isDirectory()){
            console.log('이것은 디렉토리 입니다.');

        } else{
            console.log('파일도 디렉토리도 아닙니다.');
        }
              
        });
}

function checkFileSync(filePath){ 
    const stats = fs.statSync(filePath);

        if(stats.isFile()){
            console.log('이것은 파일입니다.');
        } 
        else if(stats.isDirectory()){
            console.log('이것은 디렉토리 입니다.');

        } else{
            console.log('파일도 디렉토리도 아닙니다.');
        }
}