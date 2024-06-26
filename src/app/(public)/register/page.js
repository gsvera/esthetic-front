'use client'

import React, { useEffect, useMemo, useState } from 'react'
import styles from "../../page.module.css";
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Form, Input, DatePicker, Row, Col, Flex, Radio, Select, Checkbox } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Button from '@/components/Button';
import { REGEX_CATALOG } from '@/config/constans';
import './index.scss'
import { useQuery, useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '@/store-redux/slide/userSlide';
import { REACT_QUERY_KEYS } from '@/config/react-query-keys';
import { useNotification } from '@/hooks/useNotification';
import apiCatalogLadaPhone from '@/api/services/apiCatalogLadaPhone';
import apiCatalogProfile from '@/api/services/apiCatalogProfile';
import apiUser from '@/api/services/apiUser';
import i18next from 'i18next';
import { useRouter } from 'next/navigation';

const { useForm } = Form;

export default function Perona() {
    const { t } = useTranslation();
    const [ form ] = useForm();
    const router = useRouter();
    const dispatch = useDispatch();
    const { openSuccessNotification, openErrorNotification } = useNotification();
    const [ statusFirstName, setStatusFirstName ] = useState(false);
    const [ statusLastName, setStatusLastName ] = useState(false);
    const [ statusEmail, setStatusEmail] = useState(false);
    const [ statusBirthDate, setStatusBirthDate ] = useState(false);
    const [ statusPhone, setStatusPhone ] = useState(false);
    const [ statusPassword, setStatusPassword ] = useState(false);
    const [ statusPasswordRepeat, setStatusPasswordRepeat ] = useState(false);
    const [ checkTerms, setCheckTerms ] = useState(false);
    const [ checktPrivacy, setCheckPrivacy ] = useState(false);
    const [ loadingSend, setLoadingSend] = useState(false);
    const { token, lang } = useSelector((state) => state.userSlice);

    const validateRulesNewPassword = [
        {
          required: true,
          message: t('registro.message.error_field')
        },
        {
          min: 8,
          max: 20,
          message: t('registro.message.error_min_max_character')
        },
        {
          pattern: /^(?=.*[A-Z]).*$/,
          message: t('registro.message.password_required_uppercase')
        },
        {
          pattern: /^(?=.*[a-z]).*$/,
          message: t('registro.message.password_required_lowercase')
        },
        {
          pattern: /^(?=.*[0-9]).*$/,
          message: t('registro.message.password_required_num')
        },
        {
          // eslint-disable-next-line prefer-regex-literals
          pattern: new RegExp('^(?=.*[~”`\\[\\]\\{\\}\\^"\\\\/\'()+,.:;<=>@$!¡%#?¿&_-]).*$'),
          message: t('registro.message.password_required_character_special')
        },
      ];

    const { data: catalogLadaPhone = [] } = useQuery(
        [REACT_QUERY_KEYS.catalog.lada_phone.getAll("register")],
        () => apiCatalogLadaPhone.getAll(),
        {
            select: (data) => data.items
        }
    )

    const { data: catalogProfile = [] } = useQuery(
        [REACT_QUERY_KEYS.catalog.profile.getAll("register")],
        () => apiCatalogProfile.getAll(),
        {
            select: (data) => data.items
        }
    )

    const { mutate: saveUser} = useMutation(
        {
            mutationFn: async (data) => {
                const response = await apiUser.save(data)
                return response.data;
            },
            onSuccess: (data) => {
                if(data.error) openErrorNotification(t('registro.message.error_same_user'));
                else onSuccessSaveuser(data);
                setLoadingSend(false);
            },
            onError: (error) => {
                openErrorNotification(t('general_message.error_sistem'))
                setLoadingSend(false);
            }
        }
    );

    function onSuccessSaveuser(data) {
        // console.log("🚀 ~ onSuccessSaveuser ~ data:", data)
        openSuccessNotification(t('registro.message.success_create_user'))
        window.localStorage.setItem('tokenSession', data?.items?.token);
        window.localStorage.setItem('idProfile', data?.items?.idProfile);
        // dispatch(setToken(data?.items?.token));
        redirectPanels(data?.items?.idProfile);
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

    useEffect(() => {
        form.setFieldValue(
            'lada', 
            catalogLadaPhone.find(
                (item) => item.lang.toUpperCase() === i18next.language.toUpperCase()
            )?.id
        )
    }
    , [catalogLadaPhone, i18next.language]);

    const handleChecks = (event, setState) => {
        setState(event.target.checked);
    }

    const handleInput = async (changeState, field) => {
        try {
            if(await form.validateFields([field]))
                changeState(true);
        } catch(error) {
            changeState(false);
        }        
    }

    const handleSubmit = async () => {
        try {
            await form.validateFields()
            if(!checkTerms || !checktPrivacy) {
                alert('acepter terminos y condiciones y aviso de privacidad')
                return
            }
            setLoadingSend(true);
            saveUser({
                firstName: form.getFieldValue("firstName").trim(),
                lastName: form.getFieldValue("lastName").trim(),
                email: form.getFieldValue("email").trim(),
                birthDate: form.getFieldValue("birthDate"),
                lada: form.getFieldValue("lada"),
                phone: form.getFieldValue("phone").trim(),
                password: form.getFieldValue("password"),
                idProfile: form.getFieldValue("typeUser")
            });
        } catch(error) {
            // console.log(error)
        }
    }

    return(
        <Row style={{ display: 'flex', justifyContent: 'center'}}>
            <Col span={22} md={18} lg={14} className='my-4'>
                <Form 
                    className='card-register'
                    form={form}
                >
                    <h5 className='text-center' style={{marginBottom: '25px', marginTop: '15px'}}>{t('registro.title')}</h5>

                    <Row style={{justifyContent: 'space-between'}}>
                        <Col span={11}>
                            <Form.Item 
                                name="firstName"
                                label={t('registro.first_name')}
                                rules={[
                                    {
                                        message: t('registro.message.error_field'),
                                        required: true
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input 
                                    className={statusFirstName ? "form-input-success" : "form-input"} 
                                    onBlur={e => handleInput(setStatusFirstName, "firstName")}
                                    placeholder={t('registro.placeholder.first_name')}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name="lastName"
                                label={t('registro.last_name')}
                                rules={[
                                    {
                                        message: t('registro.message.error_field'),
                                        required: true
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input 
                                    className={statusLastName ? "form-input-success" : "form-input"} 
                                    onBlur={e => handleInput(setStatusLastName, "lastName")} 
                                    placeholder={t('registro.placeholder.last_name')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="email"
                                label={t('registro.email')}
                                rules={[
                                    {
                                        message: t('registro.message.error_email'),
                                        pattern: REGEX_CATALOG.EMAIL
                                    },
                                    {
                                        message: t('registro.message.error_field'),
                                        required: true
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input 
                                    className={statusEmail ? "form-input-success" : "form-input"} 
                                    onBlur={e => handleInput(setStatusEmail, "email")}
                                    placeholder={t('registro.placeholder.email')}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Col span={24} md={11} lg={11}>
                            <Form.Item
                                name="birthDate"
                                label={t('registro.birth_date')}
                                rules={[
                                    {
                                        message: t('registro.message.error_field'),
                                        required: true
                                    }
                                ]}
                                hasFeedback
                            >
                                <DatePicker
                                    className={statusBirthDate ? "form-input-success" : "form-input"} 
                                    onBlur={e => handleInput(setStatusBirthDate, "birthDate")}
                                    placeholder={t('registro.placeholder.birth_date')} 
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={11} lg={11}>
                            <Row>
                                <Col span={7}>
                                    <Form.Item
                                        name="lada"
                                        label="Lada"
                                        >
                                        <Select 
                                            showSearch={true}
                                            style={{borderRadius: '1px'}}
                                            options={catalogLadaPhone.map(item => 
                                                ({key: item.id, value: item.id, label: `${item.code} ${item.lada}`})
                                            )}
                                        />
                                            
                                    </Form.Item>
                                </Col>
                                <Col span={17}>
                                    <Form.Item
                                        name="phone"
                                        label={t('registro.phone')}
                                        rules={[
                                            {
                                                message: t('registro.message.error_phone'),
                                                pattern: REGEX_CATALOG.NUMBER
                                            },
                                            {
                                                message: t('registro.message.error_field'),
                                                required: true
                                            }
                                        ]}                  
                                        hasFeedback              
                                    >
                                        
                                        <Input 
                                            className={statusPhone ? "form-input-success" : "form-input"} 
                                            onBlur={e => handleInput(setStatusPhone, "phone")}
                                            placeholder={t('registro.placeholder.phone')}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Col span={24} md={11} lg={11}>
                            <Form.Item
                                name="password"
                                label={t('registro.password')}
                                rules={validateRulesNewPassword}
                                hasFeedback
                            >
                                <Input.Password 
                                    minLength={8}
                                    maxLength={20}
                                    className={statusPassword ? "form-input-success" : "form-input"} 
                                    onBlur={e => handleInput(setStatusPassword, "password")}
                                    placeholder={t('registro.placeholder.password')}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={11} lg={11}>
                            <Form.Item
                                label={t('registro.password_repeat')}
                                name="passwordRepeat"
                                rules={[
                                    ...validateRulesNewPassword,
                                    ({ getFieldValue }) => ({
                                        validator(_, value){
                                            if(!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(t('registro.message.error_same_password'));
                                        }
                                    })
                                ]}
                                hasFeedback
                            >
                                <Input.Password 
                                    className={statusPasswordRepeat ? "form-input-success" : "form-input"} 
                                    onBlur={e => handleInput(setStatusPasswordRepeat, "passwordRepeat")}
                                    placeholder={t('registro.placeholder.password_repeat')}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item 
                        name="typeUser"
                        label={t('registro.type_user')}
                        rules={[
                            {
                                message: t('registro.message.error_field'),
                                required: true
                            }
                        ]}
                    >
                        <Flex vertical gap="middle">
                            <Radio.Group>
                                {catalogProfile?.map(item => 
                                    <Radio.Button 
                                        key={item.id}
                                        className='text-center' 
                                        style={{width: '130px'}} value={item.id}>
                                        {item[`profileName${i18next.language.charAt(0).toUpperCase() + i18next.language.slice(1)}`]}
                                    </Radio.Button>
                                )}
                            </Radio.Group>
                        </Flex>
                    </Form.Item>
                    <Row className='mb-3'>
                        <Col span={24}>
                            <Checkbox 
                                onChange={e => handleChecks(e, setCheckTerms)} 
                                checked={checkTerms}
                            >
                                {t('registro.terms_conditions')}
                            </Checkbox>
                        </Col>
                        <Col span={24}>
                            <Checkbox 
                                onChange={e => handleChecks(e, setCheckPrivacy)} 
                                checked={checktPrivacy}
                            >
                                {t('registro.privacy_notification')}
                            </Checkbox>
                        </Col>
                    </Row>
                    <Button 
                        onClick={handleSubmit} 
                        className='btn-login' 
                        text={
                            loadingSend 
                            ? <LoadingOutlined style={{fontSize: '1.5em', color: 'black'}} /> 
                            : t('registro.create_user')
                        } 
                    />
                </Form>
            </Col>
        </Row>
    )
}