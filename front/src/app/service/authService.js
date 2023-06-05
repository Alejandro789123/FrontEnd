import LocalStorageService from "./localstorageService";

export const USUARIO_LOCADO = '_usuario_logado'

export default class AuthService{
    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOCADO)
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOCADO)
    }

    static logar(usuario){
        LocalStorageService.audicionarItem(USUARIO_LOCADO, usuario)
    }

    static obterUsuarioAutenticado(){
        return LocalStorageService.obterItem(USUARIO_LOCADO);
    }
}
