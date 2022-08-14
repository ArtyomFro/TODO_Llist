import React, { useRef } from 'react';


export default function Skelet1(){
    let sp=0;
//Создаются ref для получения доступа к элементами DOM в React
    const sBox1 = useRef(null);
    const sBox2 = useRef(null);
    const rz = useRef(null);
    const OL = useRef(null);
    const UL = useRef(null);
    const TX1 = useRef(null);
    const TX2 = useRef(null);
    //Функция позволяющая двигать и расширять либо уменьшать два основных компонента, при помощи перемещения третьего невидимого компонента.
    function Move(e){
        const smallBox1 =  sBox1.current;
        const smallBox2 = sBox2.current;
            let prevX=e.clientX;
            const sBW1= smallBox1.getBoundingClientRect();
            window.addEventListener("mousemove",movemouse);
            window.addEventListener("mouseup",mouseup); 
    //После наведения на средний элемент и зажатия кнопки мыши, при движени мыши извеняется размер компонентов в зависимости от положения курсора.
            function movemouse(e){
               let newX1=prevX - e.clientX;
               let newPos1=sBW1.width - newX1;
               let newX2=sBW1.left - newX1;
                if(newPos1 < 670 && newPos1 > 30){
                smallBox1.style.width= sBW1.width - newX1+"px"; 
                smallBox2.style.width= (700-sBW1.width) + newX1+"px";
                smallBox2.style.left= (sBW1.width+7) + newX2+"px";   
                } 
            }
            function mouseup(){
                window.removeEventListener("mousemove", movemouse);
                window.removeEventListener("mouseup", mouseup);
            }   
         }
    //Функция позволяющая динамически добавлять элемента TODO списка, а также их управляющие кнопки.
         function AddHTML(){
           const newLI=document.createElement("li");
            newLI.style.listStylePosition ="inside";
            newLI.style.height = "20px";
            newLI.style.margin="10px";
            newLI.style.marginRight = "10px";
            newLI.style.marginLeft = "0px";
            newLI.style.textOverflow= "ellipsis";
            newLI.style.overflow= "hidden";
            newLI.style.paddingBottom = "35px";
            newLI.id=sp+"LI1";
           const newLI2=document.createElement("li");
            newLI2.style.listStylePosition ="inside";
            newLI2.style.height = "20px";
            newLI2.style.margin="10px";
            newLI2.style.marginRight = "10px";
            newLI2.style.marginLeft = "0px";
            newLI2.style.textOverflow= "ellipsis";
            newLI2.style.overflow= "hidden";
            newLI2.style.paddingBottom = "35px";
            newLI2.id=sp+"LI2";
        //Добавляем два новых элемента, один в левый список, содержащий текст, другой в правый список с управляющими кнопками
           OL.current.appendChild(newLI);
           UL.current.appendChild(newLI2);
        //Создаем контейнер для текста в элементе левого списка.
           const newText = document.createElement("span");
           newText.innerText = TX1.current.value ;
           newText.id=sp+"TX1";
           document.getElementById(newLI.id).appendChild(newText);
        //Добавляем управляющую кнопку для удаления элемента в элемент правого списка
           const nBtn1 = document.createElement("button")
           nBtn1.innerText="Удалить"
           nBtn1.style.margin= "10px";
           nBtn1.style.marginTop="0px";
           nBtn1.style.backgroundColor= "lightseagreen"
           nBtn1.id=sp+"BTN1";
           let xSP=sp;
           nBtn1.addEventListener("click", () =>{
            OL.current.removeChild(document.getElementById(xSP+"LI1"));
            UL.current.removeChild(document.getElementById(xSP+"LI2"));
           } )
        newLI2.appendChild(nBtn1);
        //Добавляем управляющую кнопку для редактирования в элемент правого списка
           const nBtn2 = document.createElement("button");
           nBtn2.innerText="Редактировать";
           nBtn2.style.margin= "10px";
           nBtn2.style.marginTop="0px";
           nBtn2.style.backgroundColor= "lightseagreen";
           nBtn2.id=sp+"BTN2";
           nBtn2.addEventListener("click", () =>{
            let red1 = document.getElementById(xSP+"TX1");
            red1.innerText=window.prompt("Введите изменения",`${red1.innerText}`);
           } )
           newLI2.appendChild(nBtn2);
        //Создаем элемент селект с несколькими опциями, помещаем его в правый список
           const nBtn3 = document.createElement("select");
           const opt1 = document.createElement("option");
           const opt2 = document.createElement("option");
           const opt3 = document.createElement("option");
           nBtn3.style.margin= "10px";
           nBtn3.style.marginTop="0px";
           opt1.value ="1"
           opt1.text = "Ожидает"
           opt2.value ="2"
           opt2.text = "В процессе"
           opt3.value ="3"
           opt3.text = "Выполнено"
           nBtn3.add(opt1,null)
           nBtn3.add(opt2,null)
           nBtn3.add(opt3,null)
           nBtn3.style.backgroundColor= "lightseagreen"
           nBtn3.id=sp+"BTN3";
        //В зависимости от того какая опция выбрана, устанавливается цвет заднего фона текста в выбраном элементе левого списка
           document.getElementById(xSP+"TX1").style.backgroundColor="lightgrey";
            nBtn3.addEventListener("click", ()=>{
                const select =nBtn3.selectedIndex;
                 switch(select){
                    case 0: 
                    document.getElementById(xSP+"TX1").style.backgroundColor="lightgrey";
                    break;
                    case 1: 
                    document.getElementById(xSP+"TX1").style.backgroundColor="lightblue";
                    break;
                    case 2: 
                    document.getElementById(xSP+"TX1").style.backgroundColor="lightgreen";
                    break;
                    default:
                        break;
                 }
            }
            )
           sp++;
           newLI2.appendChild(nBtn3);
        //Устанавливаются два eventlisener'а, когда будет происходит поиск желтое выделение можно будет убрать наведясь на объект
        //или нажав левой кнопкой мыши в области левого контейнера
           let elem1 = document.getElementById(xSP+"TX1")
           elem1.addEventListener("mouseover", function mOver(){
            if(elem1.style.backgroundColor==="yellow"){
            const select1 = document.getElementById(xSP+"BTN3").selectedIndex;
                 switch(select1){
                    case 0: 
                    document.getElementById(xSP+"TX1").style.backgroundColor="lightgrey";
                    break;
                    case 1: 
                    document.getElementById(xSP+"TX1").style.backgroundColor="lightblue";
                    break;
                    case 2: 
                    document.getElementById(xSP+"TX1").style.backgroundColor="lightgreen";
                    break;
                    default:
                        break;
                 }
            }
        })
        sBox1.current.addEventListener("click", function mClick(){
            if(elem1.style.backgroundColor==="yellow"){
                const select2 = document.getElementById(xSP+"BTN3").selectedIndex;
                switch(select2){
                   case 0: 
                   document.getElementById(xSP+"TX1").style.backgroundColor="lightgrey";
                   break;
                   case 1: 
                   document.getElementById(xSP+"TX1").style.backgroundColor="lightblue";
                   break;
                   case 2: 
                   document.getElementById(xSP+"TX1").style.backgroundColor="lightgreen";
                   break;
                   default:
                       break;
                }
                }
        })
        } 
    //Функция поиска ищет совпадения с текстом, при их нахождении помечает элемент левого списка желтым цветом.
    function search(){
    for(let i =0; i<= sp; i++){
    if(document.getElementById(i+"TX1") != null){
    let stx = document.getElementById(i+"TX1").innerText;
    let result = stx.includes(TX2.current.value);
    if(result===true){
        let elem =document.getElementById(i+"TX1");
        elem.style.backgroundColor="yellow";        
    }
}
    }
    } 
//Элементы HTML для рендера в React
return(
<>
<div ref ={sBox2} id="smallBox2">
    <ul ref = {UL} id = "UL"></ul>
</div>
<div ref = {sBox1} id="smallBox1">
<ol ref = {OL} id = "OL"></ol>
</div>
<div ref = {rz} id ="resize" onMouseDown={Move}></div>
<button id = "btn_1" onClick={AddHTML}>Добавить</button>
<input ref = {TX1} type="text" id ="Text1"></input>
<input ref = {TX2} type="text" id ="Text2"></input>
<button id = "btn_2" onClick={search}>Поиск</button>
</>
)

}






 




