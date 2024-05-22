import { Divider } from 'antd';
import { useCurrency } from '@/hooks/useCurrency';
import { Col } from 'antd';
import './index.scss';

export const CardPlan = ({ plan, lang, onHandleSelect, planSelect }) => {
    const { convertCurrency } = useCurrency();

    const onHandleClick = () => {
        onHandleSelect?.(plan?.id)
    }

    return(
        <div className={`card-plan ${plan.id === planSelect && 'selected'}`}>
            <div className='card-plan-head'>
                <h3 className='mb-0 color-title'>{plan?.name}</h3>
                <span>{plan['description'+lang]}</span>
                <h3 className='color-price'>{convertCurrency(plan?.price)}</h3>
                <Divider style={{ margin: '10px 0'}}/>
            </div>
            <ul className='detail-plan'>
                {
                    plan?.planDetails?.map(item => 
                        <li>{item['description'+lang]}</li>
                    )
                }
            </ul>
            <div className='card-plan-footer'>
                <Divider style={{ margin: '10px 0'}}/>
                <button onClick={onHandleClick} type='button' className='btn-plan'>Seleccionar</button>
            </div>
        </div>
    )
}

export default CardPlan;