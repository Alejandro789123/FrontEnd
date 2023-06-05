import ApiService from "../apiservice"
import ErroValidacao from "../exception/erroValidacao";

export default class FornecedorService extends ApiService{
    
    constructor(){
        super('/api/cadFornecedores')
    }

    obterListaTipo(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'CPF', value: 'CPF'},
            {label: 'CNPJ', value: 'CNPJ'},
        ]
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    salvar(fornecedor){
        return this.post('', fornecedor);
    }

    atualizar(fornecedor){
        return this.put(`/${fornecedor.id}`, fornecedor);
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, {status})
    }

    validar(fornecedor){
        const erros = [];
        
        if(!fornecedor.nome){
            erros.push("informe o Nome.")
        }
        if(!fornecedor.cep){
            erros.push("informe o Cep.")
        }
        if(!fornecedor.cidade){
            erros.push("informe o Cidade.")
        }
        if(!fornecedor.bairro){
            erros.push("informe o Bairro.")
        }
        if(!fornecedor.endereco){
            erros.push("informe o Endereço.")
        }
        if(!fornecedor.complemento){
            erros.push("informe o Complemento.")
        }
        if(!fornecedor.numero){
            erros.push("informe o Numero.")
        }
        if(!fornecedor.email){
            erros.push("informe o Email.")
        }
        if(!fornecedor.telefone){
            erros.push("informe o Telefone.")
        }
        if(!fornecedor.cpf_Cnpj){
            erros.push("informe o Cpf ou Cnpj.")
        }
        if(!fornecedor.tipo){
            erros.push("informe o Tipo.")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
    }

    consultar(fornecedorFiltro){
        let params = `?nome=${fornecedorFiltro.nome}`

        if(fornecedorFiltro.email){
            params = `${params}&email=${fornecedorFiltro.email}`
        }

        if(fornecedorFiltro.tipo){
            params = `${params}&tipo=${fornecedorFiltro.tipo}`
        }

        if(fornecedorFiltro.status){
            params = `${params}&status=${fornecedorFiltro.status}`
        }

        return this.get(params);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }
}
