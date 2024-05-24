import { Modal, Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import Button from '@/components/Button';
import apiUser from '@/api/services/apiUser';
import { useMutation } from 'react-query';
import { useNotification } from '@/hooks/useNotification';
import { useRouter } from 'next/navigation';
import './index.scss';

const { Text } = Typography;

export default function ModalLogout({ open, handleClose }) {
    const { t } = useTranslation();
    const router = useRouter();
    const { openErrorNotification } = useNotification();

    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            const response = await apiUser.logout();
            console.log("🚀 ~ onMutate: ~ response:", response)
            return response.data;
        },
        onSuccess: (data) => {
            console.log("🚀 ~ ModalLogout ~ data:", data)
            if(!data?.error) {
                window.localStorage.removeItem('tokenSession');
                window.localStorage.removeItem('idProfile');
                router.push("/login");
            }
        }, 
        onError: (error) => {
            openErrorNotification(t('general_message.error_sistem'));
        }
    })

    const handleCancel = () => {
        handleClose?.(false);
    }

    const handleLogout = () => {
        logout();
        handleClose?.(false);
    }

    const FooterModal = () => {
        return(
            <Row>
                <Col span={12}>
                    <Button 
                        onClick={handleCancel} 
                        className="btn-cancel" 
                        text={t('form_login.cancel')} 
                    />
                </Col>
                <Col span={12}>
                    <Button 
                        className="btn-accept"
                        onClick={handleLogout}
                        text={t('form_login.accept')}
                    />
                </Col>
            </Row>
        );
    }

    return (
        <Modal 
            open={open} 
            closable={false}
            className='modal-logout'
            onCancel={handleCancel}
            okText={t('form_login.accept')}
            cancelText={t('form_login.cancel')}
            footer={<FooterModal />}
        >
            <Row style={{ justifyContent: 'center' }}>
                <Text style={{ fontWeight: '600'}}>{t('form_login.text_logout')}</Text>
            </Row>

        </Modal>
    )
}