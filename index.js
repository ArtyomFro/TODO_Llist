const smallBox1 = document.getElementById("smallBox1")
const smallBox2 = document.getElementById("smallBox2")
const resize = document.getElementById("resize")
resize.addEventListener("mousedown",function (e){
    let prevX=e.clientX;
    const sBW1= smallBox1.getBoundingClientRect();
    window.addEventListener("mousemove",movemouse);
    window.addEventListener("mouseup",mouseup); 
    function movemouse(e){
        newX1=prevX - e.clientX;
        newPos1=sBW1.width - newX1;
        if(newPos1 < 670 && newPos1 > 30){
        smallBox1.style.width= sBW1.width - newX1+"px"; 
        smallBox2.style.width= (700-sBW1.width) + newX1+"px";  
        } 
    }
    function mouseup(){
        window.removeEventListener("mousemove", movemouse);
        window.removeEventListener("mouseup", mouseup);
    }   
 })

