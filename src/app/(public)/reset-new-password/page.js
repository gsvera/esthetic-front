'use client'
import { useSearchParams } from "next/navigation";
import CardForm from "@/components/CardForm";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import { LoadingOutlined } from '@ant-design/icons';
import './index.scss';
import { useState } from "react";
import { useMutation } from "react-query";
import apiUser from "@/api/services/apiUser";
import { useNotification } from "@/hooks/useNotification";

const { useForm } = Form;

export const ResetNewPassword = () => {
    const params = useSearchParams()
    const [ form ] = useForm();
    const { t } = useTranslation();
    const [loadingSend, setLoadingSend] = useState(false);
    const { openSuccessNotification, openErrorNotification } = useNotification();

    const { mutate: saveResetPassword } = useMutation({
        mutationFn: async (data) => {
            const response = await apiUser.saveResetPassword(data);
            return response.data;
        },
        onSuccess: (data) => {
            if(!data.error) openSuccessNotification(t('reset_password.success_save_password'))
            else openErrorNotification(t('reset_password.token_expired'));
            setLoadingSend(false);
        },
        onError: (error) => {
            openErrorNotification(t('reset_password.token_expired'));
            setLoadingSend(false);
        }
    })

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

    const handleInput = async (field) => {
        try {
            await form.validateFields([field])
        } 
        catch(error) {
        }        
    }

    const handleSendChangePassaword = async () => {
        try {
            await form.validateFields()
            setLoadingSend(true)
            saveResetPassword({...form.getFieldsValue(), token: params.get('token')});
        }
        catch(error) {
        } 
    }

    return(
        <div className="mt-5 reset-new-password">
            <CardForm classStyle="card-new-password">
                <Form form={form} className="col-12">
                    <Form.Item 
                        name="password"
                        label={t('registro.password')}
                        rules={validateRulesNewPassword}
                        hasFeedback
                    >
                        <Input.Password 
                            minLength={8}
                            maxLength={20}
                            placeholder={t('registro.placeholder.password')}
                        />
                    </Form.Item>
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
                            minLength={8}
                            maxLength={20}
                            onBlur={e => handleInput("passwordRepeat")}
                            placeholder={t('registro.placeholder.password_repeat')}
                        />
                    </Form.Item>
                    <Button 
                        className="btn-login" 
                        onClick={handleSendChangePassaword} 
                        disabled={loadingSend}
                        text={
                            loadingSend ? <LoadingOutlined style={{fontSize: '1.5em', color: 'black'}} /> : t('reset_password.button_save')
                        }
                    />
                </Form>
            </CardForm>
        </div>
    )
}

export default ResetNewPassword;