import './index.scss'

const Button = (props) => {
    return <button 
        type="button" 
        onClick={props.onClick} 
        className={`${props.disabled ? 'disabled-button' : props.className}`} 
        disabled={props.disabled}
        style={props.style}>
            {props.text}
        </button>
}

export default Button;