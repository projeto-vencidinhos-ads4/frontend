import React from 'react'
import './style.css'

const Button = ({ children }) => {
    return (
        <button className="btn-filled">{children}</button>
    )
}

export default Button