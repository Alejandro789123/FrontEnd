import React from 'react';

import Card from   '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu';


import { withRouter } from "react-router-dom" 
import * as messages from "../../components/toastr"

import FornecedorService from '../../app/service/fornecedorService'

class CadastroFornecedores extends React.Component {

    state = {
        id: null,
        nome:'',
        cep:'',
        cidade:'',
        bairro:'',
        endereco:'',
        complemento:'',
        numero:'',
        email:'',
        telefone:'',
        cpf_Cnpj:'',
        tipo:'',
        status:'',
        atualizando: false
    }
    
    constructor(){
        super();
        this.service = new FornecedorService();
    }

    componentDidMount(){
        const params = this.props.match.params
        if(params.id){
            this.service
            .obterPorId(params.id)
            .then(response => {
                this.setState({...response.data, atualizando: true} )
            })
            .catch(erros => {
                messages.mensagemErro(erros.response.data)
            })
        }
    }

    submit = () => {

       const { nome, cep, cidade, bairro, endereco, complemento, numero, email, telefone, cpf_Cnpj,tipo } = this.state;
       const fornecedor = { nome, cep, cidade, bairro, endereco, complemento, numero, email, telefone, cpf_Cnpj, tipo};
       
       try{
            this.service.validar(fornecedor)
       }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg))
            return false
       }

       this.service
            .salvar(fornecedor)
            .then(response => {
                this.props.history.push('/consulta-fornecedores')
                messages.mensagemSucesso('Fornecedor cadastrado com sucesso!')     
            }).catch(error => {
                 messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {
       const { nome, cep, cidade, bairro, endereco, complemento, numero, email, telefone, cpf_Cnpj, tipo, status, id } = this.state;
       const fornecedor = { nome, cep, cidade, bairro, endereco, complemento, numero, email, telefone, cpf_Cnpj, tipo, status, id};
       
       this.service
            .atualizar(fornecedor)
            .then(response => {
                this.props.history.push('/consulta-fornecedores')
                messages.mensagemSucesso('Fornecedor atualizado com sucesso!')     
            }).catch(error => {
                 messages.mensagemErro(error.response.data)
            })
    }

    heldleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name] : value})
    }

    render(){
        const tipos = this.service.obterListaTipo();

        return(
            <Card title={ this.state.atualizando ? 'Atualização de Fornecedor' : 'Cadastro de Fornecedores' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputNome" label="Nome: *" >
                            <input id="inputNome" 
                                   type="text" 
                                   name="nome"
                                   value={this.state.nome}
                                   onChange={this.heldleChange}
                                   className="form-control" 
                                    />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <FormGroup id="inputCep" label="Cep: *" >
                            <input id="inputCep" type="text"
                                   name="cep"
                                   value={this.state.cep}
                                   onChange={this.heldleChange} 
                                   className="form-control" 
                                    />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputCidade" label="Cidade: *" >
                            <input id="inputCidade" type="text" 
                                   name="cidade"
                                   value={this.state.cidade}
                                   onChange={this.heldleChange} 
                                   className="form-control" 
                                    />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputBairro" label="Bairro: *" >
                            <input id="inputBairro" type="text"
                                   name="bairro"
                                   value={this.state.bairro}
                                   onChange={this.heldleChange} 
                                   className="form-control" 
                                    />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputEndereco" label="Endereço: *" >
                            <input id="inputEndereco" type="text" 
                                   name="endereco"
                                   value={this.state.endereco}
                                   onChange={this.heldleChange}
                                   className="form-control" 
                                    />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputComplemento" label="Complemento: *" >
                            <input id="inputComplemento" type="text" 
                                   name="complemento"
                                   value={this.state.complemento}
                                   onChange={this.heldleChange}
                                   className="form-control" 
                                    />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputNumero" label="Numero: *" >
                            <input id="inputNumero" type="text" 
                                   name="numero"
                                   value={this.state.numero}
                                   onChange={this.heldleChange}
                                   className="form-control" 
                                    />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <FormGroup id="inputEmail" label="Email: *" >
                            <input id="inputEmail" type="text" 
                                   name="email"
                                   value={this.state.email}
                                   onChange={this.heldleChange}
                                   className="form-control" 
                                    />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTelefone" label="Telefone: *" >
                            <input id="inputTelefone" type="text" 
                                   name="telefone"
                                   value={this.state.telefone}
                                   onChange={this.heldleChange}
                                   className="form-control" 
                                    />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <FormGroup id="inputCpf_Cnpj" label="Cpf_Cnpj: *" >
                            <input id="inputCpf_Cnpj" type="text" 
                                   name="cpf_Cnpj"
                                   value={this.state.cpf_Cnpj}
                                   onChange={this.heldleChange}
                                   className="form-control" 
                                    />
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="inputTipo" label="Tipo: *" >
                            <SelectMenu id="inpuTipo" 
                                        lista={tipos}
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.heldleChange}
                                        className="form-control"/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputStatus" label="Status: *" >
                            <input id="inputStatus" type="text" 
                                   name="status"
                                   value={this.state.status}
                                   className="form-control" disabled
                                    />
                        </FormGroup>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-6">    
                        { this.state.atualizando ?
                            (
                                <button onClick={this.atualizar}
                                    className="btn btn-success">
                                    <i className="pi pi-refresh"></i> Atualizar
                                </button>
                            ) : (
                                <button onClick={this.submit}
                                className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar
                                </button>
                            )   
                        } 
                        <button  onClick={e => this.props.history.push('/consulta-fornecedores')}
                            className="btn btn-danger">
                            <i className="pi pi-times"></i> Cancelar 
                        </button>
                    </div>
                </div>
            </Card> 
        )
    }
}

export default withRouter(CadastroFornecedores);