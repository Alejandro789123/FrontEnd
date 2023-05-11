import React from "react";
import { withRouter } from 'react-router-dom'
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";

import FornecedorService from "../../app/service/fornecedorService";

class ConsultaFornedores extends React.Component{
      
    state = {
        nome:'',
        email:'',
        tipo:'',
        fornecedor:[]
    }

    constructor(){
        super();
        this.service = new FornecedorService();
    }

    buscar =() => {
        const fornecedorFiltro = {
            
        }
    }

    render(){

        const tipos = [
            {label: 'Selecione...', value: ''},
            {label: 'CPF', value: 'CPF'},
            {label: 'CNPJ', value: 'CNPJ'},
        ]

       
        
        return(
                    <Card title="Consulta Fornecedores">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="bs-component">
                                    <FormGroup htmlFor="inputNome" label="Nome: *">
                                        <input type="text" 
                                            className="form-control" 
                                            id="inputAno" 
                                            value={this.state.nome}
                                            onChange={e => this.setState({nome: e.target.value})}
                                            placeholder="Digite o Ano" />
                                    </FormGroup>

                                    <FormGroup htmlFor="inputEmail" label="Email: *">
                                        <input type="text" 
                                        id="inputEmail" 
                                        value={this.state.email}
                                        onChange={e => this.setState({email: e.target.value})}
                                        className="form-control" 
                                        placeholder="Digite o Email" />
                                    </FormGroup>
                                    <FormGroup htmlFor="inputTipo" label="Tipo fornecedor: *">
                                        <SelectMenu id="inputTipo" 
                                        value={this.state.tipo}
                                        onChange={e => this.state({tipo: e.target.value})}
                                        className="form-control" 
                                        lista={tipos}/>
                                    </FormGroup>

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
                                    <LancamentosTable fornecedores={this.state.fornecedor} />

                           
                                </div>
                            </div>  
                        </div> 
                        
                    </Card>
                )
          }
}

export default withRouter(ConsultaFornedores);