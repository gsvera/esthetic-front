'use client'
import { Row, Typography } from 'antd'
import { redirect } from 'next/navigation';

const { Text } = Typography;

export const Client = () => {
    const tokenSession = window.localStorage.getItem("tokenSession");

    if(!tokenSession) redirect("/login")

    return(
        <Row>
            <Text>Bienvenido</Text>
        </Row>
    )
}

export default Client;