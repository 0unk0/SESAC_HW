const fs = require('fs');
const path = require('path');

let directory = '/Users/yunk._.k/SESAC/SESAC_HW';

let tree = "├─";
let tree_end = "└─";

function ls(directoryPath, prefix){
    const files = fs.readdirSync(directoryPath);
    
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        if(files[files.length-1]===file){ 
            console.log(prefix + tree_end, file); // 마지막 폴더/파일 = |__
        } else{
            console.log(prefix + tree, file);
        }
        if(stats.isDirectory()){
            if(files[files.length-1]===file){
                ls(filePath, (prefix + "   "));
            } else{
                ls(filePath, (prefix + "│  "));
            }
            
        }  
    });
}

console.log(path.basename(directory));
ls(directory, "");


