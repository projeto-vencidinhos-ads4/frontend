import React from 'react'
import './style.css'

const ButtonOutlined = ({ children, color = "" }) => {
    return (
        <button className={`btn-outlined ${color} `}>{children}</button>
    )
}

export default ButtonOutlined