'use client'
import { useEffect, useState } from "react";
import { App } from "./App";
export default function Index({children}) {
    const [langLocal, setLangLocal] = useState('es');
    useEffect(() => {
        setLangLocal(localStorage.getItem('lang'));
    },[])

    return (
        <App lang={langLocal}>
            {children}
        </App>
    )
}