import { Form, Input, Col, Row, Select, DatePicker } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { REGEX_CATALOG } from '@/config/constans';
import apiCatalogLadaPhone from '@/api/services/apiCatalogLadaPhone';
import apiUser from '@/api/services/apiUser';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { REACT_QUERY_KEYS } from '@/config/react-query-keys';
import './index.scss'
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { useDate, DATE_PICKER_PROPS } from '@/hooks/useDate';
import dayjs from 'dayjs';
import { useNotification } from '@/hooks/useNotification';

const { useForm } = Form;

export default function PersonalInformation() {
    const { t } = useTranslation();
    const { formatConfig } = useDate();
    const { openSuccessNotification, openErrorNotification } = useNotification();
    const queryClient = useQueryClient()
    const [ form ] = useForm();
    // const [lada, setLada] = useState(undefined);
    const [ loadingSend, setLoadingSend ] = useState(false);
    let tokenSession = null;

    tokenSession = localStorage.getItem("tokenSession");    

    const { mutate: updatePersonalInformation } = useMutation(
        {
            mutationFn: async (data) => {
              const response = await apiUser.updatePersonalInformation(data);
              return response.data;
            },
            onSuccess: (data) => {
                setLoadingSend(false)
                openSuccessNotification(t('general_message.update'))
            },
            onError: (data) => openErrorNotification(t('general_message.error_sistema'))
        }
    )

    const { data: catalogLadaPhone = [] } = useQuery(
        [REACT_QUERY_KEYS.catalog.lada_phone.getAll("register")],
        () => apiCatalogLadaPhone.getAll(),
        {
            select: (data) => data.items
        }
    );

    const { data: dataGetUser } = useQuery(
        [REACT_QUERY_KEYS.user.getDataByToken(tokenSession)],
        () => apiUser.getDataUser(),
        {
            select: (data) => data?.data?.items,
            onSuccess: (data) => setDataForm(data)
        }
    );

    useEffect(() => {
        if(catalogLadaPhone.length > 0 && dataGetUser) {
            const foundLada = catalogLadaPhone?.find(item => item.id === parseInt(dataGetUser?.lada))
            form.setFieldValue('lada', `${foundLada?.code} ${foundLada?.lada}`);
        }
    },[catalogLadaPhone, dataGetUser])


    const setDataForm = (data) => {
        // SE SETTEA VALOR POR VALOR PARA QUE NO PLANCHE LA LADA
        form.setFieldsValue({
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data?.email,
            phone: data?.phone,
            birthDate: dayjs(data.birthDate)
        });
    }

    const handleSubmit = async () => {
        try{
            await form.validateFields();
            setLoadingSend(true)
            updatePersonalInformation(form.getFieldsValue());
        } catch(Exception) {

        }
    }

    return (
        <Form 
            form={form} 
            className='personal-information'
        >
            <Row style={{ justifyContent: 'space-between'}}>
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
                        <Input placeholder={t('registro.placeholder.first_name')} />
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
                        <Input placeholder={t('registro.placeholder.last_name')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row style={{ justifyContent: 'space-between'}}>
                <Col span={11}>
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
                        <DatePicker {...DATE_PICKER_PROPS.disableTimeAndDateAfterNow} format={formatConfig} style={{ width: '100%' }} placeholder={t('registro.placeholder.birth_date')} />
                    </Form.Item>
                </Col>
                <Col span={11}>
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
                        <Input placeholder={t('registro.placeholder.email')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row style={{ justifyContent: 'space-between' }}>
                <Col span={6}>
                    <Form.Item
                        name="lada"
                        label="Lada"
                        rules={[
                            {
                                message: t('registro.message.error_field'),
                                required: true
                            }
                        ]}
                        hasFeedback
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
                        <Input placeholder={t('registro.placeholder.phone')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row style={{ justifyContent: 'right'}}>
                <Button 
                    disabled={loadingSend} 
                    className='btn-update' 
                    onClick={handleSubmit}
                    disabledClass="btn-update-disabled"
                    text={
                        loadingSend 
                        ? <LoadingOutlined style={{fontSize: '1.5em', color: 'black'}} /> 
                        : t('provider.settings.button_update')} 
                />
            </Row>
        </Form>
    )
}