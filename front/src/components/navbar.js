import React from "react";
import NavbarItem from "./navbaritem";
import { AuthConsumer } from "../main/provedorAutenticacao"


function NavBar(props){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="#/home" className="navbar-brand">E@sy_ConSys</a>
          <button className="navbar-toggler" type="button" 
                  data-toggle="collapse" data-target="#navbarResponsive" 
                  aria-controls="navbarResponsive" aria-expanded="false" 
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavbarItem render={props.isUsuarioAutenticado} href="#/home" label="Home" />
                <NavbarItem render={props.isUsuarioAutenticado} href="#/cadastro-usuarios" label="Cadastro de Usuários" />
                <NavbarItem render={props.isUsuarioAutenticado} href="#/cadastro-fornecedor" label="Cadastro de Fornecedor" />
                <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-fornecedores" label="Consulta de Fornecedor" />
                <NavbarItem render={props.isUsuarioAutenticado} href="#/" label="ADM" />
                <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/login" label="Sair" />
            </ul>
            </div>
        </div>
      </div>
    )
}

export default () => (
  <AuthConsumer>
  {
    (context) => (<NavBar isUsuarioAutenticado={context.isAuteticado} deslogar={context.encerrarSessao}/> )
  }
  </AuthConsumer>
)
