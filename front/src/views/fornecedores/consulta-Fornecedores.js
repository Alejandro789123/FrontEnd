import React from "react";
import { withRouter } from "react-router-dom"

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import FornecedorTable from "./fornecedorTable";
import FornecedorService from "../../app/service/fornecedorService";

import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaFornedores extends React.Component{
      
    state = {
        nome:'',
        email:'',
        tipo:'',
        showConfirmeDialog: false,
        fornecedorDeletar: {},
        fornecedor:[]
    }

    constructor(){
        super();
        this.service = new FornecedorService();
    }

    buscar = () => {
        if(!this.state.nome){
            messages.mensagemErro('O preenchimento do corpo nome e obrigatório.')
        }

        const fornecedorFiltro = {
            nome: this.state.nome,
            email: this.state.email,
            tipo: this.state.tipo
        }

        this.service
        .consultar(fornecedorFiltro)
        .then(resposta =>{
            const lista = resposta.data;
            if(lista.length < 1){
                messages.mensagemAlert('Nenhum resultado encontrado.')
            }
            this.setState({fornecedor: lista})
        }).catch(error => { 
            console.log(error)
        })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-fornecedor/${id}`)    
    }

    abrirConfirmacao = (fornecedor)  =>{
        this.setState({showConfirmeDialog : true, fornecedorDeletar: fornecedor })
    }

    cancelarDelecao = () =>{
        this.setState({showConfirmeDialog : false, fornecedorDeletar: {} })
    }

    deletar = () => {
        this.service
        .deletar(this.state.fornecedorDeletar.id)
        .then(response => {
            const fornecedores =  this.state.fornecedor;
            const index = fornecedores.indexOf(this.state.fornecedorDeletar)
            fornecedores.splice(index, 1);
            this.setState({fornecedores: fornecedores, showConfirmeDialog: false})
            messages.mensagemSucesso('Fornecedor deletado com sucesso!')
        }).catch(error =>{
            messages.mensagemErro('Ocorreu um erro ao tentar deletar o fornecedor')
        })
    }

    preparaFormularioCadastro = () => [
        this.props.history.push('/cadastro-fornecedor')
    ]

    alterarStatus = (fornecedor, status) => {
        this.service
        .alterarStatus(fornecedor.id, status)
        .then(response => {
            const fornecedor = this.state.fornecedor;
            const index = fornecedor.indexOf(fornecedor);
            if(index !== -1){
                fornecedor['status'] = status;
                fornecedor[index] = fornecedor
                this.setState({fornecedor});
            }
            messages.mensagemSucesso("Status atualizado com sucesso!")
        })
    }
    render(){

        const tipos = this.service.obterListaTipo();

        const showConfirmeDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} 
                        className="p-button-secondary"/>
            </div>
        );
           
        return(
                    <Card title="Consulta Fornecedores">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="bs-component">
                                    <FormGroup htmlFor="inputNome" label="Nome: *">
                                        <input type="text" 
                                            className="form-control" 
                                            id="inputNome" 
                                            value={this.state.nome}
                                            onChange={e => this.setState({nome: e.target.value})}
                                            placeholder="Digite o Nome" />
                                    </FormGroup>

                                    <FormGroup htmlFor="inputEmail" label="Email: *">
                                        <input type="text"
                                        className="form-control"  
                                        id="inputEmail" 
                                        value={this.state.email}
                                        onChange={e => this.setState({email: e.target.value})}
                                        placeholder="Digite o Email" />
                                    </FormGroup>
                                    <FormGroup htmlFor="inputTipo" label="Tipo fornecedor: *">
                                        <SelectMenu 
                                        id="inputTipo" 
                                        className="form-control" 
                                        value={this.state.tipo}
                                        onChange={e => this.setState({tipo: e.target.value})}
                                        lista={tipos}/>
                                    </FormGroup>
                                    <br />
                                    <button onClick={this.buscar} 
                                    type="button" 
                                    className="btn btn-success">
                                    <i className="pi pi-search"></i> Buscar
                                    </button>

                                    <button onClick={this.preparaFormularioCadastro} 
                                    type="button" 
                                    className="btn btn-danger">
                                    <i className="pi pi-plus"></i> Cadastrar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bs-component">
                                    <FornecedorTable fornecedores={this.state.fornecedor} 
                                                        deletarAction={this.abrirConfirmacao}
                                                        editarAction={this.editar}
                                                        alterarStatus={this.alterarStatus} />
                                </div>
                            </div>  
                        </div> 
                        <div>
                        <Dialog header="Confirmação" 
                                visible={this.state.showConfirmeDialog} 
                                style={{width: '50vw'}} 
                                footer={showConfirmeDialogFooter}
                                modal={true} 
                                onHide={() => this.setState({showConfirmeDialog: false})}>
                            Confirma a exclusão deste fornecedor?
                        </Dialog>
                        </div>
                        
                    </Card>
                )
          }
}

export default withRouter(ConsultaFornedores);