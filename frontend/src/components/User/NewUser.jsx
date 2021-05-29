import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Card,
  Col,
  Input,
  Button,
  FormGroup
} from "reactstrap";
import axios from "axios";
import {LinkContainer} from "react-router-bootstrap";

import AppActions from '../../actions/AppActions';
import Swal from 'sweetalert2'


class NewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {}
    }
    this.save_button = this.save_button.bind(this);
    this.change_box = this.change_box.bind(this);
    this.change_address = this.change_address.bind(this);
  }

  change_box(event) {

    let newUser = this.state.newUser
    newUser[event.target.id] = event.target.value
    this.setState({newUser: newUser});
    console.log(this.state.newUser)
  }

  change_address(event) {
    const id = event.target.id;
    const value = event.target.value;

    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser,
        address: {
          ...prevState.newUser.address,
          [id]: value
        }
      }
    }))
  }

  async save_button() {
    //se lo pasamos al backend
    await axios.post("https://bonsaiart.herokuapp.com/api/users", this.state.newUser)
    // ---------------

    const users = await axios.get("https://bonsaiart.herokuapp.com/api/users");
    let user = {}

    //cogemos solo el usuario que hemos acabamos de crear
    user = users.data.map((user) => {
      if (user.nickname == this.state.newUser.nickname) {
        return user
      } else {
        return null
      }
    })
    user = user.pop();
    const cart = {
      user_id: user._id
    }
    Swal.fire({title: 'Nuevo usuario', text: 'Nueva cuenta creada correctamente', type: 'success', confirmButtonText: 'Iniciar sesion'}).then((result) =>{
      if(result.value || !result.value){
        window.location.href = window.location.href.slice(0, 33) + "login"

      }
    })

    await axios.post("https://bonsaiart.herokuapp.com/api/cart", cart) //creamos cart del usuario


  }

  render() {
    return (<div className=''>
      <Row>
        <Col xl={7} lg={7} md={7} sm={12} xs={12}></Col>
        <Col xl={5} lg={5} md={5} sm={12} xs={12}>
          <Card className=' newUser_card py-4 text-center' body="body">
            <h4>Nueva cuenta</h4>
            <div className='text-left mb-4 '>
              <span>Nombre</span>
              <Input id='name' onChange={this.change_box}></Input>
            </div>
            <div className='text-left mb-4 '>
              <span>Nickname</span>
              <Input id='nickname' onChange={this.change_box}></Input>
            </div>
            <div className='text-left mb-4 '>
              <span>DNI</span>
              <Input id='dni' onChange={this.change_box}></Input>
            </div>
            <div className='text-left mb-4'>
              <span>Correo electronico</span>
              <Input id='email' onChange={this.change_box}></Input>
            </div>
            <div className='text-left mb-4'>
              <span>Dirección</span>
              <Input id='address' onChange={this.change_address}></Input>
            </div>
            <Row>
              <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                <div className='text-left mb-4'>
                  <span>Ciudad</span>
                  <Input id='city' onChange={this.change_address}></Input>
                </div>
              </Col>
              <Col xl={4} lg={4} md={4} sm={6} xs={6}>
                <div className='text-left mb-4'>
                  <span>Provincia</span>
                  <Input id='province' onChange={this.change_address}></Input>
                </div>
              </Col>
              <Col xl={4} lg={4} md={4} sm={6} xs={6}>
                <div className='text-left mb-4'>
                  <span>C.P.</span>
                  <Input id='cp' onChange={this.change_address}></Input>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <div className='text-left mb-4'>
                  <span>Teléfono movil</span>
                  <Input id='mobile' onChange={this.change_box}></Input>
                </div>
              </Col>
              <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <div className='text-left mb-4'>
                  <span>Teléfono</span>
                  <Input id='tel' onChange={this.change_box}></Input>
                </div>
              </Col>
            </Row>
            <div className='text-left mb-4'>
              <span>Contraseña</span>
              <Input type="password" id="user_pass" pattern=".{1,}" onChange={this.change_box}/>
            </div>
            <div>
              <Button color='secondary' onClick={this.save_button} className='mt-2'>
                Guardar
              </Button>
            </div>
            <FormGroup className="mt-4 text-center">
              <LinkContainer className={'clickable ' + (
                  window.location.pathname === "/login"
                  ? 'active'
                  : '')} to="/login">
                <a className="clickable" to="/login" href="">Iniciar sesión</a>
              </LinkContainer>
            </FormGroup>
          </Card>
        </Col>
      </Row>
    </div>);
  }
}

function selectStateApp(state) {
  return {app: state.app};
}

export default connect(selectStateApp, dispatch => ({
  setUserLogged: (user) => dispatch(AppActions.setUserLogged(user))
}),)(NewUser);
