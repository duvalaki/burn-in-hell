import { useState, useEffect } from "react";
import App from './App';
export function Home(){
    const [show, setShow]= useState(false);
    return <div>
        {show && <App/>}
        {!show &&    <div> 
            <h1>Set your rage on fire...</h1>
            <button onClick={()=> setShow(true)}>start</button>
        </div>}
    </div>
    
}