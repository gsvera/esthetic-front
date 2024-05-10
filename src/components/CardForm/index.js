'use client'
import './index.scss';

export const CardForm = ({ children, classStyle, style}) => {
    return(
        <div className={`card-form-white-pink py-3 px-5 ${classStyle}`} style={style} >
            {children}
        </div>
    )
}

export default CardForm;