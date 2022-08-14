import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Skelet1 from "./skelet"
//Программа написана с использованием React на JavaScript
//Автор: Фролов Артем Витальевич
const root = ReactDOM.createRoot( document.getElementById('root') );
function App(){
    return(
        <>
        <Skelet1 />
        </>
    )
}
root.render(<App />); 





