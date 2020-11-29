import React from 'react';

function Login(props) {
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
        props.login(email, password)
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h1 className="login__title">Вход</h1>
                <div className="login__input-list">
                    <input type="Email" autoComplete="off" placeholder="Email" value={email} className="login__input-email" required minLength="2" maxLength="100" onChange={handleEmail} />
                    <input type="password" autoComplete="off" placeholder="Пароль" value={password} className="login__input-password" required minLength="2" maxLength="100" onChange={handlePassword} />
                </div>
                <button type="submit" className="login__button">
                    Войти
        </button>
            </form>
        </div>
    )
}

export default Login 