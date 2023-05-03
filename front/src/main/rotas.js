import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import { Route, Switch,HashRouter} from 'react-router-dom'
import Home from "../views/home";

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route exaut path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cadastro-usuarios" component={CadastroUsuario} />
            </Switch>
        </HashRouter>
    )
}
export default Rotas