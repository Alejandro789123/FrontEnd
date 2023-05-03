import React from "react";


class Home extends React.Component{
    render(){
        return (
            <div class="container">
                <div className="jumbotron">
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Esse é seu sistema de compras.</p>
                    <hr className="my-4" />
                    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" 
                        href="#/cadastro-usuarios" 
                        role="button"><i className="pi pi-users"></i>  
                        Cadastrar Usuário
                        </a>
                        <a className="btn btn-danger btn-lg" 
                        href="#/" 
                        role="button"><i className="pi pi-money-bill"></i>  
                        Cadastrar Fornecedor
                        </a>
                    </p>
                </div>
            </div>    
        )
    }
}

export default Home