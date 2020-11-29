import React from 'react';
import { Link } from 'react-router-dom'

function Register(props) {
    
    const [email, setEmail] = React.useState('')

    const [password, setPassword] = React.useState('')

    function handleEmail(e) {
        setEmail(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.register(email, password)
    }

    return (
        <div className="register">
            <form onSubmit={handleSubmit} noValidate>
                <h1 className="register__title">Регистрация</h1>
                <div className="register__input-list">
                    <input name="email" type="Email" autoComplete="off" placeholder="Email" className="register__input-email" value={email} required minLength="2" maxLength="100" onChange={handleEmail} />
                    <input name="password" type="password" autoComplete="off" placeholder="Пароль" className="register__input-password" value={password} required minLength="2" maxLength="100" onChange={handlePassword} />
                </div>
                <button type="submit" className="register__button">
                    Зарегистрироваться
               </button>
                <div className="register__sing-in">
                    <p className="register__text">Уже зарегистрированы?</p>
                    <Link className="register__link" to="/sing-in">Войти</Link>
                </div>
            </form>
        </div>
    )
}

export default Register