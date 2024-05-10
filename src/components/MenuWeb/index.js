'use client'
import Link from 'next/link'
import './index.scss'
import Button from '../Button';
import i18n from '../../config/translations/i18n';
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react';

export default function MenuWeb() {
    const { t } = useTranslation();
    const [lang, setLang] = useState()
    
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

    const handleLenguage = () => {
        const languageChange = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(languageChange)
        localStorage.setItem('lang', languageChange);
    }
    return(
        <div className='menu-web d-flex' id="menu-web">
            <div className='col-2'>
                <div className='center-x-y' style={{height: '100px', display: 'flex'}}>
                    <img style={{width: 'auto', height: '85px'}} src='/assets/logo-esthetic.webp' />
                </div>
            </div>
            <div className='col-10' style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
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
                    <Button className="btn-lang" onClick={handleLenguage} text={lang?.toUpperCase()} />
                </div>
            </div>
        </div>
    )
}