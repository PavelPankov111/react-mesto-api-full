import React from 'react';
import { Route, Switch } from 'react-router-dom'

function Footer() {
    return <Switch>
        <Route path="/404" />
        <Route path="*" exact>
            <footer className="footer">
                <p className="footer__title">&copy; Pankov Pavel</p>
            </footer>
        </Route>

    </Switch>
}

export default Footer;