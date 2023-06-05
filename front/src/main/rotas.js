import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import { Route, Switch, HashRouter, Redirect} from 'react-router-dom'
import Home from "../views/home";
import consultaFornecedores from "../views/fornecedores/consulta-Fornecedores";
import cadastroFornecedores from "../views/fornecedores/cadastro-fornecedores";
import { AuthConsumer } from "../main/provedorAutenticacao"


     function RotaAutenticada({component: Component,isUsuarioAutenticado, ...props} ){
         return(
             <Route {...props} render= {(componentProps) =>{
                 if(isUsuarioAutenticado){
                     return(
                         <Component {...componentProps}/>
                     )
                 }else{
                     return(
                         <Redirect to={ {pathname : '/login', state : {from: componentProps.location} } }/>
                     )
                 }
             }}
             />
         )
     }
    function Rotas(props){
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} /> 
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-usuarios" component={CadastroUsuario} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-fornecedores" component={consultaFornecedores} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-fornecedor/:id?" component={cadastroFornecedores}/>
            </Switch>
        </HashRouter>
    )
}


export default () => (
    <AuthConsumer>
        {(context) => (<Rotas isUsuarioAutenticado={context.isAuteticado} />)}
    </AuthConsumer>
)