import Logo from '../../logo.png'
import Styles from './Header.module.css'
import Form from '../form/Form'
import { useState } from 'react'

export default function Header() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <header>
            <div>
                <img className={Styles.logo} src={Logo} alt="Logo of our company" /> 
            </div>
            <div>
                <button className={Styles.button} onClick={() => setIsOpen(true)}>
                    Связаться с нами
                </button>
            </div>
            <Form  isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    )
}