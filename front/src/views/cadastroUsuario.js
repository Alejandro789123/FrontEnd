import React from "react";

import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from "react-router-dom";
import SelectMenu from "../components/selectMenu";

import UsuarioService from "../app/service/usuarioService";
import { mensagemSucesso, mensagemErro } from "../components/toastr";


class CadastroUsuario extends React.Component{
    
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: '',
        perfil:''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    

    cadastrar = () => {
        
        const {nome, email, senha, senhaRepeticao, perfil, } = this.state
        const usuario = { nome, email, senha, senhaRepeticao, perfil}

        try{
            this.service.validar(usuario);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.salvar(usuario)
        .then(response => {
            mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema. ')
            this.props.history.push('/login')
        }).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render(){

        const perfil = [
            {label: 'Selecione...', value: ''},
            {label: 'COMPRADOR', value: 'COMPRADOR'},
            {label: 'CLIENTE', value: 'CLIENTE'},
            {label: 'ADMINISTRADOR', value: 'ADMINISTRADOR'},
        ]


        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                       id="inputNome" 
                                       className="form-control"
                                       name="nome"
                                       onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" 
                                       id="inputEmail"
                                       className="form-control"
                                       name="email"
                                       onChange={e => this.setState({email: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" 
                                       id="inputSenha"
                                       className="form-control"
                                       name="senha"
                                       onChange={e => this.setState({senha: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" 
                                       id="inputRepitaSenha"
                                       className="form-control"
                                       name="senha"
                                       onChange={e => this.setState({senhaRepeticao: e.target.value})} />
                            </FormGroup>
                            
                            <div className="col-lg-6">
                            <div className="bs-component">
                            <FormGroup htmlFor="inputPerfil" label="Perfil: ">
                                        <SelectMenu id="inputPerfil" 
                                        value={this.state.perfil}
                                        onChange={e => this.setState({perfil: e.target.value})}
                                        className="form-control" 
                                        lista={perfil}/>
                            </FormGroup>
                            </div>
                            </div>
                            <br />
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar
                            </button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>

        )
    }
}

export default withRouter(CadastroUsuario)