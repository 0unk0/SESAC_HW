var result = " ";

function display(num){
    text = document.getElementsByClassName("num")[num].innerText;
    document.getElementById("text").value+=text;
    result+=text;
}


function cal(operator){
    i=result.length;
    
    text = document.getElementsByClassName("operator")[operator].innerText;

   if(text==="="){
    total=eval(result);
    document.getElementById("text").value=total;
    result=total;
   }

   else if(text==="C"){
    document.getElementById("text").value="";
    result="";
   }       

   else{
    result+=text;
    document.getElementById("text").value+=text;
   }



}