import './Header.css'
import logo from './images/Troll Face.svg'

export default function Header() {
    return (
        <div className="Header">
            <div className='Header-left'>
                <img src={logo} alt='logo' className='Logo-header'/>
                <div className='Header-left-text '>Meme Generator</div>
            </div>
            <div className='Header-right'>
                React Course - Project 3
            </div>
        </div>
    );
};