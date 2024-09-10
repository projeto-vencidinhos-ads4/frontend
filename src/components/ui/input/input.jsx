import "./style.css"

const Input = ({ className = "input-default ", value, placeholder, id, name }) => {
    return (
        <input className={className} defaultValue={value} placeholder={placeholder ?? ""} name={name} id={id} type="text" />

    )
}

export default Input