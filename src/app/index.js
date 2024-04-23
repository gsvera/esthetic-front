'use client'
import { App } from "./App";
export default function Index({children}) {
    const langLocal = window.localStorage.getItem('lang');
    console.log("🚀 ~ Index ~ langLocal:", langLocal)
    return (
        <App lang={langLocal}>
            {children}            
        </App>
    )
}