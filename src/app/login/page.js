'use client'
import styles from "../page.module.css";
import Button from '../../components/Button';
import apiUser from "@/api/services/apiUser";
import { useMutation } from 'react-query';
import './index.scss'
import { useTranslation } from 'react-i18next'
import Link from "next/link";
import { Form, Input, Row } from "antd";
import { useNotification } from "@/hooks/useNotification";
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const { useForm } = Form;

export const Login = () => {
    const { t } = useTranslation();
    const [ form ] = useForm();
    const router = useRouter()

    const { openErrorNotification } = useNotification();
    const [ loading, setLoaging ] = useState(false);

    const { mutate: loginUser } = useMutation({
        mutationFn: async (data) => {
            const response = await apiUser.login(data);
            return response.data;
        },
        onSuccess: (data) => {
            if(data?.error) {
                setLoaging(false)
                openErrorNotification(t('form_login.user_password_invalidate'));
            }
            else handleSuccessLogin(data?.items);
        },
        onError: (error) =>{
            // console.log(error)
            openErrorNotification(t('form_login.error_login'))
        } 
    });

    useEffect(() => {
        console.log(window.localStorage.getItem('tokenSession'))
        if(window.localStorage.getItem('tokenSession') !== null)
            redirectPanels(window.localStorage.getItem('idProfile'));
    },[])

    function handleSuccessLogin(data) {
        window.localStorage.setItem('tokenSession', data?.token);
        window.localStorage.setItem('idProfile', data.idProfile);
        redirectPanels(data.idProfile);
    }

    function redirectPanels (idProfile){
        switch (idProfile) {
            case 1:
                router.push("/panel-client");
                break;
            case 2: 
                router.push("/")
                break;
        }
    }

    const onLogin = async () => {
        try{
            await form.validateFields()
            setLoaging(true);
            loginUser(form.getFieldsValue())
        } catch(error) {

        }
    }

    return(
        <div className={`${styles.main}`}>
            <Form form={form} className="col-11 mx-auto mt-5 content-form-login">
                <Row className="row d-flex justify-content-center">
                    <div className="col-7">
                        <div className="" style={{borderRadius: '1rem', background: 'transparent'}}>
                            <Row>
                                <div className="col-md-5 col-lg-5 bg-logo-back center-x-y row">
                                    <img src="/assets/logo-esthetic.webp" alt="login form" className="img-login"/>
                                </div>
                                <div className="col-md-7 col-lg-7 d-flex align-items-center body-content-login">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <div className="d-flex justify-content-center mb-3 pb-1">
                                            <h5 className="font-bold mb-0">{t('form_login.login')}</h5>
                                    </div>
                                <Form.Item
                                    className="form-label"
                                    style={{marginLeft: '0'}}
                                    label={t('form_login.email')}
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: t('registro.message.error_field')
                                        }
                                    ]}
                                >
                                    <Input className="form-input"/>
                                </Form.Item>
                                <Form.Item
                                    className="form-label"
                                    style={{marginLeft: '0'}}
                                    label={t('form_login.password')}
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: t('registro.message.error_field')
                                        }
                                    ]}
                                >
                                    <Input.Password className="form-input" />
                                </Form.Item>    
                                <Button 
                                    className="btn-login mt-3 mb-3" 
                                    onClick={onLogin} 
                                    text={
                                        loading ? <LoadingOutlined style={{fontSize: '1.5em'}} /> : t('form_login.button_login')
                                    }
                                />
                                <div className="text-center">
                                    <a href="#" className='font-link'>{t('form_login.forget_password')}</a>
                                </div>
                                <div className='text-center'>
                                    <span>{t('form_login.no_count')} </span><Link className='font-link' href="/register">{t('form_login.create')}</Link>
                                </div>
                            </div>
                        </div>
                        </Row>
                    </div>
                    </div>
                </Row>
            </Form>
        </div>
    )
}

export default Login;