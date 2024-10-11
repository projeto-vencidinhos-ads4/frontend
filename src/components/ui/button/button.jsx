import React from 'react'
import './style.css'

const Button = ({ children , onClick }) => {
    return (
        <button className={"btn-filled">{children} } onClick={onClick}>{children}</button>

    )
}

export default Button