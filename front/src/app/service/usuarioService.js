import ApiService from "../apiservice";

class UsuarioService extends ApiService{
    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

     obterUsuario(){
        return this.get('')
     }

     salvar(usuario){
        return this.post('', usuario)
     }
     
}

 

export default UsuarioService;