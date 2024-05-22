'use client'
import Link from 'next/link'
import i18n from '../../config/translations/i18n';
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Col, Image, Row, Select } from 'antd';
import './index.scss'

export default function MenuWeb() {
    const { t } = useTranslation();
    const [lang, setLang] = useState()
    const [menuMobile, setMenuMobile] = useState(false);
    
    useEffect(() => {
        setLang(localStorage.getItem('lang'))
        window.addEventListener('scroll', function() {
            var menu = document.querySelector('.menu-web');
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

    return(
        <div>
            <Row className='menu-web d-flex' id="menu-web">
                <Col className='content-mobile' span={6} style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <button onClick={handleMenuMobile} className='menu-button-mobile'><MenuOutlined /></button>
                </Col>
                <Col span={12} md={5} sm={15}>
                    <div className='center-x-y' style={{height: '100px', display: 'flex'}}>
                        <img style={{width: 'auto', height: '85px'}} src='/assets/logo-esthetic.webp' />
                    </div>
                </Col>
                <Col span={16} className='options-menu'>
                    <div className='d-flex' style={{justifyContent: 'space-between', width: '70%'}}>
                        <div className='aling-text'>
                            <Link href="/" className='text-menu'>{t('menu_web.home')}</Link>
                        </div>
                        <div className='aling-text'>
                            <Link href="#" className='text-menu'>{t('menu_web.request_service')}</Link>
                        </div>
                        <div className='aling-text'>
                            <Link href="#" className='text-menu'>{t('menu_web.want_be_provider')}</Link>
                        </div>
                        <div className='menu-item aling-text'>
                            <Link href={"/login"} className='text-menu'>{t('menu_web.login')}</Link>                        
                        </div>
                    </div>
                </Col>
                <Col span={5} md={1} sm={3} xl={1} className='menu-item aling-text'>
                    <Select 
                        value={lang}
                        onChange={handleLenguage}
                        options={[
                            {key: 'en', value: 'en', label: <img src="/assets/lang/en.png" className='flag-lang' style={{width: '20px', height: '15px'}} />},
                            {key: 'es', value: 'es', label: <img src="/assets/lang/es.png" className='flag-lang' style={{width: '20px', height: '15px'}} />}
                        ]}
                    >                    
                    </Select>
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
        </div>
    )
}