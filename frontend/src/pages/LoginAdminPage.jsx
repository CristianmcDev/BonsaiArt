import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Input,
    Row,
    Col,
    FormGroup,
    Label,
    Button
} from "reactstrap";
import {LinkContainer} from "react-router-bootstrap";
import axios from "axios";

import logoBonsai from '../imgs/Logo_bonsaiArt.ico'

import AppActions from '../actions/AppActions';
import LoginAdminLayout from '../components/layouts/LoginAdminLayout'

class LoginAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                user: '',
                password: ''
            },
              user: false,
              password: false
        };
        this.handleUser = this.handleUser.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.validateLogin = this.validateLogin.bind(this);
    }

    handleUser(user) {
        const login = this.state.login;
        login.user = user.target.value;
        this.setState({login});
    }

    handlePassword(password) {
        const login = this.state.login;
        login.password = password.target.value;
        this.setState({login});
    }

    async validateLogin(){
      const admins = await axios.get("https://bonsaiart.herokuapp.com/api/admin");
      admins.data.map((user) => {
          if(user.nickname.toLowerCase() == this.state.login.user.toLowerCase()){
            if(user.user_pass == this.state.login.password){// LOGIN OK
              //ponemos un objeto con todos los datos para pasarlo a props app
              const login = {
                "logged": true,
                "id_user": user._id,
                "name": user.name,
                "nickname": user.nickname,
  		          "user_pass":user.user_pass
              };
              this.props.setUserLogged(login);

              window.location.href = window.location.href.slice(0, 33) + "notifications"
            }else{
              alert("Contraseña incorrecta, vuelva a intentarlo de nuevo")
              this.setState({password: true})
            }
          }
      })
    }

    render() {
        return (<LoginAdminLayout>
            <Row className="mr-0">
                <Col className='p-0 ml-auto' xl={3} lg={4} md={4} sm={8} xs={12}>
                    <div className="px-4  card-login">
                        <div className='w-100'>
                            <div className="text-center w-75 m-auto">
                            <LinkContainer className='clickable' to="/shop">
                              <img className='pb-4 logoBonsai' src={logoBonsai} alt="Bonsai Art logo"/>
                            </LinkContainer>
                                <h3>Bonsai Art</h3>
                                <p className="text-muted mb-4">
                                    Acceso de administrador
                                </p>
      {
                                    (this.state.user || this.state.password)
                                        ? <span style={{
                                                    margin: "25px",
                                                    textAlign: "center",
                                                    color: 'red'
                                                }}>
                                                El login es incorrecto</span>
                                        : null
                                }
                            </div>
                            <FormGroup>
                                <Label className='text-bold' for="usuario">Usuario</Label>
                                <Input className="form-control" value={this.state.login.user} type="text" name="usuario" id="usuario" onChange={this.handleUser} onKeyDown={this.onKeyDown}/>
                            </FormGroup>

                            <FormGroup>
                                <Label className='text-bold' for="password">Contraseña</Label>
                                <Input className="form-control" type="password" name="password" id="password" value={this.state.login.password} onKeyDown={this.onKeyDown} onChange={this.handlePassword}/>
                            </FormGroup>

                            <FormGroup className="mb-0 text-center">
                                <Button color="primary" onClick={this.validateLogin}>
                                    Entrar
                                </Button>
                            </FormGroup>
                            <FormGroup className="mt-4 text-center">
                            <LinkContainer className={'clickable ' + (
                                window.location.pathname === "/login"
                                ? 'active'
                                : '')} to="/login">
                              <a className="clickable">¿Eres un cliente?</a>
                              </LinkContainer>
                            </FormGroup>
                        </div>
                    </div>
                </Col>
            </Row>
        </LoginAdminLayout>);
    }
}
function selectStateApp(state) {
    return {appState: state.app};
}

export default connect(selectStateApp, dispatch => ({
    setUserLogged: (user) => dispatch(AppActions.setUserLogged(user)),
    setPublicKey: (key) => dispatch(AppActions.setPublicKey(key))
}),)(LoginAdmin);
