

const Button = (props) => {

    return <button 
        type="button" 
        onClick={props.onClick} 
        className={props.className} 
        style={props.style}>
            {props.text}
        </button>
}

export default Button;