import "./style.css";

const ButtonOutlined = ({ children, color = "", onClick }) => {
    return (
        <button className={`btn-outlined ${color}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default ButtonOutlined;
