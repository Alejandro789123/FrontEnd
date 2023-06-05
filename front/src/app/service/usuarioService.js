import ApiService from "../apiservice";
import ErroValidacao from "../exception/erroValidacao";

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
     
     validar(usuario){
        const erros =[]
        if(!usuario.nome){
            erros.push('O campo Nome e obrigatório.')
        }
        if(!usuario.email){
            erros.push('O campo Emaile e obrigatorio.')
        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){ // regex para validar email
            erros.push('Informe um Email válido.')
        }
        if(!usuario.senha || !usuario.senhaRepeticao){
          erros.push('Digite a senha 2x.')
        }else if(usuario.senha !== usuario.senhaRepeticao){
            erros.push('As senhas não batem.')
        }
        
        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
     }
}

 

export default UsuarioService;