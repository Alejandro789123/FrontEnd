import React from "react";

export default props => {
    const rows = props.fornecedores.map(fornecedor =>{
        return (
                    <tr key={fornecedor.id}>
                        <td>{fornecedor.nome}</td>
                        <td>{fornecedor.cep}</td>
                        <td>{fornecedor.cidade}</td>
                        <td>{fornecedor.bairro}</td>
                        <td>{fornecedor.endereco}</td>
                        <td>{fornecedor.complemento}</td>
                        <td>{fornecedor.numero}</td>
                        <td>{fornecedor.email}</td>
                        <td>{fornecedor.telefone}</td>
                        <td>{fornecedor.cpf_Cnpj}</td>
                        <td>{fornecedor.tipo}</td>
                        <td>{fornecedor.status}</td>
                        <td>
                            <button  
                                className="btn btn-success"
                                title="Efetivar"
                                // disabled={fornecedor.status !== 'PENDENTE'}
                                onClick={e => props.alterarStatus(fornecedor, 'EFETIVADO')}
                                type="button" >
                                <i className="pi pi-check"></i>
                            </button>
                            <button  
                                className="btn btn-warning"
                                title="Cancelar"
                                // disabled={fornecedor.status !== 'PENDENTE'}
                                onClick={e => props.alterarStatus(fornecedor, 'CANCELADO')}
                                type="button" >
                                <i className="pi pi-times"></i>
                            </button>
                            <button  
                                className="btn btn-primary"
                                title="Editar"
                                onClick={e => props.editarAction(fornecedor.id)}
                                type="button">
                                <i className="pi pi-pencil"></i>
                            </button>
                            <button  
                                type="button" 
                                className="btn btn-danger"
                                title="Excluir"
                                onClick={e => props.deletarAction(fornecedor)}>
                                 <i className="pi pi-trash"></i>
                            </button>
                        </td>
                    </tr>
                )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Cep</th>
                    <th scope="col">Cidade</th>
                    <th scope="col">Bairro</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Complemento</th>
                    <th scope="col">Numero</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Cpf_Cnpj</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}