var result = " ";

function display(num){
    text = document.getElementsByClassName("num")[num].innerText;
    document.getElementById("text").value+=text;
    result+=text;
}


function cal(operator){
    i=result.length;
    
    switch(operator){
        case 0: 
            if(result[i-1]=="+" || result[i-1]=="-" || result[i-1]=="*" || result[i-1]=="/"){
                result.slice(0,-1);
            }
            result+="+";
            document.getElementById("text").value+="+";
            break;

        case 1: 
            result+="-";
            document.getElementById("text").value+="-";
            break;

        case 2: 
            result+="*";
            document.getElementById("text").value+="*";
            break;

        case 3: 
            result+="/";
            document.getElementById("text").value+="/";
            break;

        case 4: 
            total=eval(result);
            document.getElementById("text").value=total;
            result=total;
            console.log(result);
            console.log(total);
            
            break;

        case 5: 
            document.getElementById("text").value="";
            result="";
            break;

    }



}