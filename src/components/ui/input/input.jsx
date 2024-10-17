import "./style.css";

const Input = ({
    className = "input-default ",
    value,
    defaultValue = null,
    placeholder,
    id,
    name,
    onChange,
    rest,
}) => {
    return (
        <input
            className={className}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder ?? ""}
            name={name}
            id={id}
            type="text"
            onChange={onChange}
            {...rest}
        />
    );
};

export default Input;
