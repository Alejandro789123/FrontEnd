import React from "react";
import AuthService from "../app/service/authService";

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = AuthContext.Provider;

class ProvedorAutenticacao extends React.Component{
    
    state = {
        usuarioAutenticado: null,
        isAuteticado: false
    }

    iniciarSessao = (usuario) => {
        AuthService.logar(usuario);
        this.setState({ isAuteticado: true, usuarioAutenticado: usuario})
    }

    encerrarSessao = () => {
        AuthService.removerUsuarioAutenticado();
        this.setState({isAuteticado: false, usuarioAutenticado: null})
    }

    render(){
        const contexto = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAuteticado: this.state.isAuteticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return(
            <AuthProvider value={contexto} >
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao;