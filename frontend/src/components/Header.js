import React from 'react';
import headerLogo from '../images/vector.svg'
import { Link, Route, Switch } from 'react-router-dom'

function Header(props) {
    return <Switch>
        <Route path="/404" exact />
        <Route path="*" exact>
            <header className="header">
                <img className="header__logo" alt="Место Россия" src={headerLogo} />
                <Switch>
                    <Route path="/sing-up">
                        <div className="header__box">
                            <Link className="header__button" to="/sing-in">Войти</Link>
                        </div>
                    </Route>
                    <Route exact path="/">
                        <div className="header__box">
                            <p className="header__email">{props.email}</p>
                            <Link onClick={props.onClick} className="header__button" to="/sing-in">Выйти</Link>
                        </div>
                    </Route>
                    <Route path="/sing-in">
                        <div className="header__box">
                            <Link className="header__button" to="/sing-up">Регистрация</Link>
                        </div>
                    </Route>
                </Switch>
            </header>

        </Route>
    </Switch>
}

export default Header;