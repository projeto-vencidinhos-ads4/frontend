import React from 'react'
import './style.css'

const Button = ({ children,onClick }) => {
    return (
        <button className={"btn-filled"} onClick={onClick}>{children}</button>

    )
}

export default Button