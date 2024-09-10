import React from 'react'
import './style.css'

const Header = () => {
    return (
        <header className="header">
            <div className="header-bar">
                <div className="header-right-section">
                    <div className="profile">
                        <img src="https://media.discordapp.net/attachments/1210420838084378625/1282062167297757235/image.png?ex=66ddfcf0&is=66dcab70&hm=ac9a480f3c09a9c5c69605d18edaac9dcbeaf6c2a224cef6bd3efb92bbb3af48&=&format=webp&quality=lossless&width=42&height=42" alt="Profile Picture" className="profile-pic"/>
                        <span className="profile-name">Vencidinho's User</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header