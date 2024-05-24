'use client'
import { useState, useEffect } from "react";
import { Row, Col, Select, Tooltip } from 'antd';
import { MenuOutlined, BellOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import i18n from "@/config/translations/i18n";
import Link from 'next/link';
import './index.scss';
import ConfigModalProvider from "@/components/provider/ConfigModalProvider";
import ModalLogout from "@/components/shared/logout";

export const MenuProvider = () => {
    const { t } = useTranslation();
    const [ lang, setLang ] = useState();
    const [ menuMobile, setMenuMobile ] = useState(false);
    const [ showSetting, setShowSetting ] = useState(false);
    const [ showLogout, setShowLogout ] = useState(false);

    useEffect(() => {
        setLang(localStorage.getItem('lang'))
        window.addEventListener('scroll', function() {
            var menu = document.querySelector('.menu-web-provider');
            if(menu) {
                if (window.scrollY > 0) {
                  menu.classList.add('scrolled'); // Agregar clase cuando se hace scroll
                } else {
                  menu.classList.remove('scrolled'); // Eliminar clase cuando se encuentra en la parte superior
                }
            }
          });
    }, [])

    const handleLenguage = (value) => {
        setLang(value)
        i18n.changeLanguage(value)
        localStorage.setItem('lang', value);
    }

    const handleMenuMobile = () => {
        setMenuMobile(!menuMobile); 
    }

    const handleSetting = () => {
        setShowSetting(true)
    }

    const handleLogout = () => {
        setShowLogout(true);
    }
    return(
        <div>
            <Row className='menu-web-provider d-flex' id="menu-web-provider">
                <Col className='content-mobile' span={6} style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <button onClick={handleMenuMobile} className='menu-button-mobile'><MenuOutlined /></button>
                </Col>
                <Col span={12} md={5} sm={15}>
                    <div className='center-x-y' style={{height: '100px', display: 'flex'}}>
                        <img style={{width: 'auto', height: '85px'}} src='/assets/logo-esthetic.webp' />
                    </div>
                </Col>
                <Col span={16} className='menu-item aling-icon-menu'>
                    <Row style={{justifyContent: 'space-between', width: '20%'}}>
                        <Tooltip placement="top" title={t('menu_provider.notification')}>
                            <BellOutlined className="icon-menu"/>
                        </Tooltip>
                        <Tooltip placement="top" title={t('menu_provider.settings')}>
                            <SettingOutlined onClick={handleSetting} className="icon-menu"/>
                        </Tooltip>
                        <Tooltip placement="top" title={t('menu_provider.logout')}>
                            <LogoutOutlined onClick={handleLogout} className="icon-menu"/>
                        </Tooltip>
                        <Select 
                            style={{border: 'none'}}
                            value={lang}
                            onChange={handleLenguage}
                            options={[
                                {key: 'en', value: 'en', label: <img src="/assets/lang/en.png" className='flag-lang' style={{width: '20px', height: '15px'}} />},
                                {key: 'es', value: 'es', label: <img src="/assets/lang/es.png" className='flag-lang' style={{width: '20px', height: '15px'}} />}
                            ]}
                        >                    
                        </Select>
                    </Row>
                </Col>
            </Row>
            <div className='content-mobile'>
                <ul className={`menu-none-mobile ${menuMobile && 'menu-mobile'}`}>
                    <li className='aling-text'>
                        <Link href="/" className='text-menu'>{t('menu_web.home')}</Link>
                    </li>
                    <li className='aling-text'>
                        <Link href="#" className='text-menu'>{t('menu_web.request_service')}</Link>
                    </li>
                    <li className='aling-text'>
                        <Link href="#" className='text-menu'>{t('menu_web.want_be_provider')}</Link>
                    </li>
                    <li className='menu-item aling-text'>
                        <Link href={"/login"} className='text-menu'>{t('menu_web.login')}</Link>                        
                    </li>
                </ul>               
            </div>
            <ConfigModalProvider open={showSetting} handleClose={setShowSetting}/>
            <ModalLogout open={showLogout} handleClose={setShowLogout}/>
        </div>
    )
}

export default MenuProvider;