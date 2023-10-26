var result = " ";
// var temp="";

function display(num){
    text = document.getElementsByClassName("num")[num].innerText;

    document.getElementById("text").value+=text;

        // console.log(text);
}


function cal(operator){
    i=result.length;

    switch(operator){
        case 0: 
            if(result[i-1]=="+" || result[i-1]=="-" || result[i-1]=="*" || result[i-1]=="/"){
                result.slice(0,-1);
            }
            result+=document.getElementById("text").value;
            result+="+";
            document.getElementById("text").value="";
            // console.log(result);
            break;

        case 1: 
            // if(result[i-1]==="+" || result[i-1]==="-" || result[i-1]==="*" || result[i-1]==="/"){
            //     result.slice(0,-1);
            // }
            result+=document.getElementById("text").value;
            result+="-";
            document.getElementById("text").value="";
            // console.log(result);
            break;

        case 2: 
            // if(result[i-1]==="+" || result[i-1]==="-" || result[i-1]==="*" || result[i-1]==="/"){
            //     result.slice(0,-1);
            // }
            result+=document.getElementById("text").value;
            result+="*";
            document.getElementById("text").value="";
            // console.log(result);
            break;

        case 3: 
            // if(result[i-1]==="+" || result[i-1]==="-" || result[i-1]==="*" || result[i-1]==="/"){
            //     result.slice(0,-1);
            // }   
            result+=document.getElementById("text").value;
            result+="/";
            document.getElementById("text").value="";
            // console.log(result);
            break;

        case 4: 
            result+=document.getElementById("text").value;
            total=eval(result);
            document.getElementById("text").value=total;
            console.log(result);
            console.log(total);
            
            break;

        case 5: 
            document.getElementById("text").value="";
            result="";
            break;

    }



}