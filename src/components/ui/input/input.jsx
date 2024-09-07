import "./style.css"

const Input = (props) => {
    console.log(props)
    return (
        <input className={props.className} defaultValue={props.value} placeholder={props.placeholder ?? "NULO"} name="category" id="category" type="text" />

    )
}

export default Input