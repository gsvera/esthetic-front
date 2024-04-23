'use client'

import React from 'react'
import styles from "../../../page.module.css";
import { useParams, useSearchParams } from 'next/navigation'

export default function Perona() {
    const parametros = useParams()
    const searchParams = useSearchParams()

    console.log(parametros)
    console.log("🚀 ~ Id:", searchParams.get('id'))

    
    return(
        <div className={styles.main}>
            Hola {parametros.providerName.replaceAll('-', ' ')} tu tipo de servicio es de {parametros.typeService.replaceAll("-", " ")}
        </div>
    )
}