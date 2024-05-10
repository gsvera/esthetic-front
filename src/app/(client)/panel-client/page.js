'use client'
import { Row, Spin, Typography } from 'antd'
import { redirect } from 'next/navigation';
import apiUser from '@/api/services/apiUser';
import { useQuery } from 'react-query';
import { REACT_QUERY_KEYS } from '@/config/react-query-keys';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setDataUser } from '@/store-redux/slide/userSlide';
import { useEffect, useMemo, useState } from 'react';

const { Text } = Typography;

export default function Client (){
    const dispatch = useDispatch();
    let tokenSession = null;
    const { token, lang, dataUser } = useSelector((state) => state.userSlice);

    const completeName = useMemo(() => `${dataUser.firstName} ${dataUser.lastName}`,[dataUser])

    tokenSession = localStorage.getItem("tokenSession");    
    
    dispatch(setToken(tokenSession));

    if(!token) redirect("/login")

    const { data: dataGetUser, isLoading: loadignDataUser } = useQuery(
        [REACT_QUERY_KEYS.user.getDataByToken(tokenSession)],
        () => apiUser.getDataUser(),
        {
            select: (data) => data?.data?.items,
            onSuccess: (data) => dispatch(setDataUser(data))
        }
    );

    if(loadignDataUser) return <Spin />

    return(
        <Row>
            <Text>Bienvenido {completeName}</Text>
        </Row>
    )
}
