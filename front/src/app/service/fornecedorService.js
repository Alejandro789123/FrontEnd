import ApiService from '../apiservice'

export default class FornecedorService extends ApiService{
    constructor(){
        super('/api/cadFornecedores')
    }

    consultar(fornecedorFiltro){
        let params = `?ano=${fornecedorFiltro.ano}`

        if(fornecedorFiltro.mes){
            params = `${params}&mes=${fornecedorFiltro.mes}`
        }

        if(fornecedorFiltro.tipo){
            params = `${params}&tipo=${fornecedorFiltro.tipo}`
        }

        if(fornecedorFiltro.status){
            params = `${params}&status=${fornecedorFiltro.status}`
        }

        if(fornecedorFiltro.usuario){
            params = `${params}&usuario=${fornecedorFiltro.usuario}`
        }

        if(fornecedorFiltro.descricao){
            params = `${params}&descricao=${fornecedorFiltro.descricao}`
        }

        return this.get(params);
    }
}
