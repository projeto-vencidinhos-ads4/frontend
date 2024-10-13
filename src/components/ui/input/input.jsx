import "./style.css"

const Input = ({ className = "input-default ", value, placeholder, id, name, onChange}) => {
    return (
        <input className={className} defaultValue={value} placeholder={placeholder ?? ""} name={name} id={id} type="text" onChange={onChange}/>

    )
}

export default Input

