import { Modal, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { UserOutlined, FormatPainterOutlined } from '@ant-design/icons';
import { useState, useMemo } from 'react';
import PersonalInformation from './PersonalInformation';
import './index.scss'

export const ConfigModalProvider = ({ open, handleClose }) => {
    const { t } = useTranslation();

    const handleCancel = () => {
        handleClose?.(false)
    }

    const itemsTabs = useMemo(() => {
        return [
            {
                key: 'personal_information',
                label: <Tooltip placement='left' title={t('provider.settings.tabs.personal_information.tab_title')}><UserOutlined className='icon-tab'/></Tooltip>,
                children: <PersonalInformation />
            },
            {
                key: 'service',
                label: <Tooltip placement='left' title={t('provider.settings.tabs.service_information.tab_title')}><FormatPainterOutlined className="icon-tab" /></Tooltip>,
                children: 'servicio'
            }
        ]
    },[])

    return (
        <Modal 
            className='config-moda-provider' 
            open={open} 
            title={t('provider.settings.modal_title')} 
            onCancel={handleCancel} 
            width={'60%'} 
            footer={null}
            destroyOnClose
        >
            <Tabs 
                tabPosition='left' 
                items={itemsTabs.map(item => item)}
            />
        </Modal>
    )
}

export default ConfigModalProvider