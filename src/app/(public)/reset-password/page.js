'use client'
import { Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import CardForm from "@/components/CardForm";
import { REGEX_CATALOG } from "@/config/constans";
import Button from "@/components/Button";
import { useNotification } from "@/hooks/useNotification";
import apiUser from "@/api/services/apiUser";
import { useMutation } from "react-query";
import './index.scss';
import { useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';

const { useForm } = Form;

export const ResetPassword = () => {
    const { t } = useTranslation();
    const [ form ] = useForm();
    const { openSuccessNotification, openErrorNotification } = useNotification();
    const [loadingSend, setLoadingSend] = useState(false);

    const { mutate: sendResetEmail } = useMutation({
        mutationFn: async (data) => {
            const response = await apiUser.requestResetPassword(data);
            return response.data;
        },
        onSuccess:  (data) => {
            if(!data?.error) openSuccessNotification(t('reset_password.success_send_email'));
            else openErrorNotification(t('reset_password.error_send'))
            setLoadingSend(false)
        },
        onError: (error) => {
            console.log(error)
            openErrorNotification(t('reset_password.error_send'))
            setLoadingSend(false)
        }
        
    })

    const handleSend = async () => {
        try{
            await form.validateFields();
            setLoadingSend(true)
            sendResetEmail({...form.getFieldsValue(), message: t('reset_password.message')});
        } catch(error) {

        }
    }

    return (
        <div className="mt-5 reset-password">
            <CardForm classStyle="card-password">
                <Form form={form} className="col-11">
                    <h5>{t('reset_password.title')}</h5>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                pattern: REGEX_CATALOG.EMAIL,
                                message: t('registro.message.error_email')
                            },
                            {
                                required: true,
                                message: t('registro.message.error_email')
                            }
                        ]}
                        hasFeedback
                    >
                        <Input placeholder={t('reset_password.placholder_email')} />
                    </Form.Item>
                    <Button 
                        className='btn-login' 
                        onClick={handleSend} 
                        style={{padding: '10px 25px'}} 
                        text={loadingSend ? <LoadingOutlined style={{fontSize: '1.5em', color: 'black'}} /> : t('reset_password.button')}
                        disabled={loadingSend} 
                    />
                </Form>
            </CardForm>
        </div>
    )
}

export default ResetPassword;