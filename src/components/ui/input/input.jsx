import "./style.css"

const Input = ({ className = "input-default ", value, placeholder }) => {
    return (
        <input className={className} defaultValue={value} placeholder={placeholder ?? ""} name="category" id="category" type="text" />

    )
}

export default Input