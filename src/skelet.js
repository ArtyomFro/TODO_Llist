import React, { useRef } from 'react';

export default function Skelet1(){
//Создаются ref для получения доступа к элементами DOM в React
    let sp=1;
    if(JSON.parse(localStorage.getItem('sp')>1)){
    sp=localStorage.getItem('sp');
    }
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
    //Функции позволяющая динамически добавлять элементы TODO списка, а также их управляющие кнопки.
    //Добавляем два новых элемента листа, один в левый список, содержащий текст, другой в правый список с управляющими кнопками
            function newLIST(){
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
            localStorage.setItem(sp+'IDLIST', JSON.stringify(newLI.id));
            OL.current.appendChild(newLI);
            }
            function newLIST2(){
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
            localStorage.setItem(sp+'IDLIST2', JSON.stringify(newLI2.id));
           UL.current.appendChild(newLI2);
            }
        //Создаем контейнер для текста в элементе левого списка.
        function newTX(){
           const newText = document.createElement("span");
           const newLI1=document.getElementById(sp+"LI1");
           newText.innerText = TX1.current.value ;
           newText.id=sp+"TX1";
           newLI1.appendChild(newText);
           let xSP=sp;
           let elem1 = document.getElementById(sp + "TX1")
           localStorage.setItem(sp+'IDTEXT', JSON.stringify(newText.id));
           localStorage.setItem(sp+'IDINNERTEXT', JSON.stringify(newText.innerText));
        //Устанавливаются eventlisener, когда будет происходить поиск желтое выделение можно будет убрать наведясь на объект
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
        }
        //Добавляем управляющую кнопку для удаления элемента в элемент правого списка
        function newBTN1(){
        const newLI2=document.getElementById(sp+"LI2");
           const nBtn1 = document.createElement("button")
           nBtn1.innerText="Удалить"
           nBtn1.style.margin= "10px";
           nBtn1.style.marginTop="0px";
           nBtn1.style.backgroundColor= "lightseagreen"
           nBtn1.id=sp+"BTN1";
           localStorage.setItem(sp+'IDBTN1', JSON.stringify(nBtn1.id));
           let xSP=sp;
           nBtn1.addEventListener("click", () =>{
            OL.current.removeChild(document.getElementById(xSP+"LI1"));
            UL.current.removeChild(document.getElementById(xSP+"LI2"));
            localStorage.removeItem(xSP+'IDBTN1');
            localStorage.removeItem(xSP+'IDBTN2');
            localStorage.removeItem(xSP+'IDTEXT');
            localStorage.removeItem(xSP+'IDLIST');
            localStorage.removeItem(xSP+'IDLIST2');
            localStorage.removeItem(xSP+'IDBTN3');
            localStorage.removeItem(xSP+'IDBTN3Select');
            localStorage.removeItem(xSP+'IDBTN3Index');
            localStorage.removeItem(xSP+'IDINNERTEXT');
           } )
           newLI2.appendChild(nBtn1);
        }
        
        //Добавляем управляющую кнопку для редактирования в элемент правого списка
        function newBTN2(){
           const nBtn2 = document.createElement("button");
           const newLI2=document.getElementById(sp+"LI2");
           nBtn2.innerText="Редактировать";
           nBtn2.style.margin= "10px";
           nBtn2.style.marginTop="0px";
           nBtn2.style.backgroundColor= "lightseagreen";
           nBtn2.id=sp+"BTN2";
           let xSP= sp;
           localStorage.setItem(sp+'IDBTN2', JSON.stringify(nBtn2.id));
           nBtn2.addEventListener("click", () =>{
            let red1 = document.getElementById(xSP+"TX1");
            red1.innerText=window.prompt("Введите изменения",`${red1.innerText}`);
            localStorage.setItem(xSP+'IDINNERTEXT', JSON.stringify(red1.innerText));
           } )
           newLI2.appendChild(nBtn2);
        }
        //Создаем элемент селект с несколькими опциями, помещаем его в правый список
        function Select(){
           const nBtn3 = document.createElement("select");
           const opt1 = document.createElement("option");
           const opt2 = document.createElement("option");
           const opt3 = document.createElement("option");
           const newLI2=document.getElementById(sp+"LI2");
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
           let xSP=sp;
           localStorage.setItem(sp+'IDBTN3', JSON.stringify(nBtn3.id));
           newLI2.appendChild(nBtn3);
        //В зависимости от того какая опция выбрана, устанавливается цвет заднего фона текста в выбраном элементе левого списка
           document.getElementById(sp+"TX1").style.backgroundColor="lightgrey";
           localStorage.setItem(xSP+'IDBTN3Select', JSON.stringify( document.getElementById(xSP+"TX1").style.backgroundColor));
           localStorage.setItem(xSP+'IDBTN3Index', JSON.stringify( JSON.stringify(nBtn3.selectedIndex)));
            nBtn3.addEventListener("click", ()=>{
                const select =nBtn3.selectedIndex;
                 switch(select){
                    case 0: 
                    document.getElementById(xSP+"TX1").style.backgroundColor="lightgrey";
                    localStorage.setItem(xSP+'IDBTN3Select', JSON.stringify( document.getElementById(xSP+"TX1").style.backgroundColor));
                    localStorage.setItem(xSP+'IDBTN3Index', JSON.stringify( JSON.stringify(nBtn3.selectedIndex)));
                    break;
                    case 1: 
                    document.getElementById(xSP+"TX1").style.backgroundColor="lightblue";
                    localStorage.setItem(xSP+'IDBTN3Select', JSON.stringify( document.getElementById(xSP+"TX1").style.backgroundColor));
                    localStorage.setItem(xSP+'IDBTN3Index', JSON.stringify( JSON.stringify(nBtn3.selectedIndex)));
                    break;
                    case 2: 
                    document.getElementById(xSP+"TX1").style.backgroundColor="lightgreen";
                    localStorage.setItem(xSP+'IDBTN3Select', JSON.stringify( document.getElementById(xSP+"TX1").style.backgroundColor));
                    localStorage.setItem(xSP+'IDBTN3Index', JSON.stringify( JSON.stringify(nBtn3.selectedIndex)));
                    break;
                    default:
                        break;
                 }
            }
            ) 
    }
//Функции для сохраниения состояния TODO листа при перезагрузке или закрытии приложения
    function RnewLIST(j){
        const newLI=document.createElement("li");
         newLI.style.listStylePosition ="inside";
         newLI.style.height = "20px";
         newLI.style.margin="10px";
         newLI.style.marginRight = "10px";
         newLI.style.marginLeft = "0px";
         newLI.style.textOverflow= "ellipsis";
         newLI.style.overflow= "hidden";
         newLI.style.paddingBottom = "35px";
         newLI.id=JSON.parse(localStorage.getItem(j+'IDLIST'));
         OL.current.appendChild(newLI);
         }
         function RnewLIST2(j){
            const newLI2=document.createElement("li");
             newLI2.style.listStylePosition ="inside";
             newLI2.style.height = "20px";
             newLI2.style.margin="10px";
             newLI2.style.marginRight = "10px";
             newLI2.style.marginLeft = "0px";
             newLI2.style.textOverflow= "ellipsis";
             newLI2.style.overflow= "hidden";
             newLI2.style.paddingBottom = "35px";
             newLI2.id=JSON.parse(localStorage.getItem(j+'IDLIST2'));
            UL.current.appendChild(newLI2);
             }
    
             function RnewTX(j){
                const newText = document.createElement("span");
                const newLI1=document.getElementById(j+"LI1");
                newText.innerText = JSON.parse(localStorage.getItem(j+'IDINNERTEXT')); 
                newText.id=JSON.parse(localStorage.getItem(j+'IDTEXT'));
                newLI1.appendChild(newText);
                let xSP=j;
                let elem1 = document.getElementById(j+"TX1")
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
             } 
             function RnewBTN1(j){
                const newLI2=document.getElementById(j+"LI2");
                   const nBtn1 = document.createElement("button");
                   nBtn1.innerText="Удалить";
                   nBtn1.style.margin= "10px";
                   nBtn1.style.marginTop="0px";
                   nBtn1.style.backgroundColor= "lightseagreen";
                   nBtn1.id=JSON.parse(localStorage.getItem(j+'IDBTN1'));
                   let xSP=j;
                   nBtn1.addEventListener("click", () =>{
                    OL.current.removeChild(document.getElementById(xSP+"LI1"));
                    UL.current.removeChild(document.getElementById(xSP+"LI2"));
                    localStorage.removeItem(xSP+'IDBTN1');
                    localStorage.removeItem(xSP+'IDBTN2');
                    localStorage.removeItem(xSP+'IDTEXT');
                    localStorage.removeItem(xSP+'IDLIST');
                    localStorage.removeItem(xSP+'IDLIST2');
                    localStorage.removeItem(xSP+'IDBTN3');
                    localStorage.removeItem(xSP+'IDBTN3Select');
                    localStorage.removeItem(xSP+'IDBTN3Index');
                    localStorage.removeItem(xSP+'IDINNERTEXT');
                   } )
                   newLI2.appendChild(nBtn1);
                } 
    
                function RnewBTN2(j){
                    const nBtn2 = document.createElement("button");
                    const newLI2=document.getElementById(j+"LI2");
                    nBtn2.innerText="Редактировать";
                    nBtn2.style.margin= "10px";
                    nBtn2.style.marginTop="0px";
                    nBtn2.style.backgroundColor= "lightseagreen";
                    nBtn2.id=JSON.parse(localStorage.getItem(j+'IDBTN2'));
                    let xSP= j;
                    nBtn2.addEventListener("click", () =>{
                     let red1 = document.getElementById(xSP+"TX1");
                     red1.innerText=window.prompt("Введите изменения",`${red1.innerText}`);
                     localStorage.setItem(xSP+'IDINNERTEXT', JSON.stringify(red1.innerText));
                    } )
                    newLI2.appendChild(nBtn2);
                 } 
                 
                 function RSelect(j){
                    const nBtn3 = document.createElement("select");
                    const opt1 = document.createElement("option");
                    const opt2 = document.createElement("option");
                    const opt3 = document.createElement("option");
                    const newLI2=document.getElementById(j+"LI2");
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
                    nBtn3.id=JSON.parse(localStorage.getItem(j+'IDBTN3'));
                    nBtn3.style.backgroundColor= "lightseagreen"
                    nBtn3.selectedIndex=JSON.parse(localStorage.getItem(j+'IDBTN3Index'));
                    document.getElementById(j+"TX1").style.backgroundColor=JSON.parse(localStorage.getItem(j+'IDBTN3Select'));
                    let xSP=j;
                    newLI2.appendChild(nBtn3);
                    localStorage.setItem(xSP+'IDBTN3Select', JSON.stringify( document.getElementById(xSP+"TX1").style.backgroundColor));
                    localStorage.setItem(xSP+'IDBTN3Index', JSON.stringify( JSON.stringify(nBtn3.selectedIndex)));
                     nBtn3.addEventListener("click", ()=>{
                         const select =nBtn3.selectedIndex;
                          switch(select){
                             case 0: 
                             document.getElementById(xSP+"TX1").style.backgroundColor="lightgrey";
                             localStorage.setItem(xSP+'IDBTN3Select', JSON.stringify( document.getElementById(xSP+"TX1").style.backgroundColor));
                             localStorage.setItem(xSP+'IDBTN3Index', JSON.stringify( JSON.stringify(nBtn3.selectedIndex)));
                             break;
                             case 1: 
                             document.getElementById(xSP+"TX1").style.backgroundColor="lightblue";
                             localStorage.setItem(xSP+'IDBTN3Select', JSON.stringify( document.getElementById(xSP+"TX1").style.backgroundColor));
                             localStorage.setItem(xSP+'IDBTN3Index', JSON.stringify( JSON.stringify(nBtn3.selectedIndex)));
                             break;
                             case 2: 
                             document.getElementById(xSP+"TX1").style.backgroundColor="lightgreen";
                             localStorage.setItem(xSP+'IDBTN3Select', JSON.stringify( document.getElementById(xSP+"TX1").style.backgroundColor));
                             localStorage.setItem(xSP+'IDBTN3Index', JSON.stringify( JSON.stringify(nBtn3.selectedIndex)));
                             break;
                             default:
                                 break;
                          }
                     }
                     ) 
             }
    //Функция поиска ищет совпадения с текстом, при их нахождении помечает элемент левого списка желтым цветом.
    function search(){
    for(let i =1; i<= sp; i++){
    if(document.getElementById(i+"TX1") != null){
    let stx = document.getElementById(i+"TX1").innerText;
    let result = stx.includes(TX2.current.value);
    if(result===true){
        let xSP =i;
        let elem =document.getElementById(i+"TX1");
        elem.style.backgroundColor="yellow"; 
     //Устанавливаются eventlisener, когда будет происходить поиск желтое выделение можно будет убрать кликнув в области левого основного элемента
        sBox1.current.addEventListener("click", function mClick(){
            if(elem.style.backgroundColor==="yellow"){
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
                sBox1.current.removeEventListener("click",mClick);
        })       
    }
}
    }
    } 
//Добавление новых элементов 
function AddHTML(){
    newLIST();
    newLIST2();
    newTX();
    newBTN1();
    newBTN2();
    Select();
    sp++;
    localStorage.setItem('sp', JSON.stringify(sp));
}
//Загрузка старых элементов из памяти
function reload(){
    if(UL.current!=null ){
        for(let i =1; i<= sp; i++){
            if(JSON.parse(localStorage.getItem(i+'IDLIST'))){
                RnewLIST(i);
                RnewLIST2(i);
                RnewTX(i);
                RnewBTN1(i);
                RnewBTN2(i);
                RSelect(i);
            
    }

}
}}
setTimeout(reload,50)

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






 




