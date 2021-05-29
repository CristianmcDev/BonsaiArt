import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Card, Col, Input, Button} from "reactstrap";
import PulseLoader from 'react-spinners/PulseLoader';
import axios from "axios";

import AppActions from '../../actions/AppActions';
import {showAlert} from '../../js/helper_functions'

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLogged: {}
    }
    this.save_button = this.save_button.bind(this);
    this.get_loader = this.get_loader.bind(this);
    this.change_box = this.change_box.bind(this);
    this.change_address = this.change_address.bind(this);
  }

  componentWillMount() {
    this.setState({userLogged: this.props.app.userLogged})
  }

  get_loader() {
    return (<Col className='my-5 text-center'>
      <PulseLoader sizeUnit={"px"} size={15} color={'#ffffff'}/>
    </Col>)
  }
  change_box(event) {

    let userLogged = this.state.userLogged
    userLogged[event.target.id] = event.target.value
    this.setState({userLogged: userLogged});
  }

  change_address(event) {
    const id = event.target.id;
    const value = event.target.value;

    this.setState(prevState => ({
      userLogged: {
        ...prevState.userLogged,
        address: {
          ...prevState.userLogged.address,
          [id]: value
        }
      }
    }))
  }

  async save_button() {
    this.props.setUserLogged(this.state.userLogged); //cambia localmente
    //se lo pasamos al backend
    await axios.put("https://bonsaiart.herokuapp.com/api/users/" + this.props.app.userLogged.id_user, this.state.userLogged)
    // ---------------
    showAlert("Guardado", "Cambios en perfil guardados correctamente", "success")
  }

  render() {
    return (<div className=''>
      <h3 className='mt-2 mb-0 py-4 title'>Perfil</h3>
      <Row>
        <Col className='mb-4 text-center' xl={4} lg={4} md={4} sm={12} xs={12}>
          <Card body="body " className=''>
            <div className=''>
              <h4 className=''>{this.props.app.userLogged.name}</h4>
              <p>
                <span className='text-bold'>Nickname:
                </span>{' '}
                {this.props.app.userLogged.nickname}
              </p>
              <p>
                <span className='text-bold'>DNI:
                </span>{' '}
                {this.props.app.userLogged.dni}
              </p>
              <p>
                <span className='text-bold'>E-mail:
                </span>{' '}
                {this.props.app.userLogged.email}
              </p>
              <p>
                <span className='text-bold'>Teléfono movil:
                </span>{' '}
                {this.props.app.userLogged.mobile}
              </p>
              <p>
                <span className='text-bold'>Teléfono :
                </span>{' '}
                {this.props.app.userLogged.tel}
              </p>
              <p>
                <span className='text-bold'>Dirección:
                </span>{' '}
                {this.props.app.userLogged.address.address}
                <br/> {this.props.app.userLogged.address.city}{' '}
                ({this.props.app.userLogged.address.province}) ,{' '}{this.props.app.userLogged.address.cp}
              </p>
            </div>
          </Card>
        </Col>
        <Col xl={8} lg={8} md={8} sm={12} xs={12}>
          <Card body="body" className='py-4 text-center'>
            <h4>Información</h4>
            <div className='text-left mb-4 '>
              <span>Nombre</span>
              <Input placeholder={this.state.userLogged.name} id='name' value={this.state.userLogged.name} onChange={this.change_box}></Input>
            </div>
            <div className='text-left mb-4 '>
              <span>Nickname</span>
              <Input placeholder={this.state.userLogged.nickname} id='nickname' value={this.state.userLogged.nickname} onChange={this.change_box}></Input>
            </div>
            <div className='text-left mb-4 '>
              <span>DNI</span>
              <Input placeholder={this.state.userLogged.dni} id='dni' value={this.state.userLogged.dni} onChange={this.change_box}></Input>
            </div>
            <Row>
              <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <div className='text-left mb-4'>
                  <span>Teléfono movil</span>
                  <Input placeholder={this.state.userLogged.mobile} id='mobile' value={this.state.userLogged.mobile} onChange={this.change_box}></Input>
                </div>
              </Col>
              <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <div className='text-left mb-4'>
                  <span>Teléfono</span>
                  <Input placeholder={this.state.userLogged.tel} id='tel' value={this.state.userLogged.tel} onChange={this.change_box}></Input>
                </div>
              </Col>
            </Row>
            <div className='text-left mb-4'>
              <span>Correo electronico</span>
              <Input placeholder={this.state.userLogged.email} id='email' value={this.state.userLogged.email} onChange={this.change_box}></Input>
            </div>
            <div className='text-left mb-4'>
              <span>Dirección</span>
              <Input placeholder={this.state.userLogged.address.address} id='address' value={this.state.userLogged.address.address} onChange={this.change_address}></Input>
            </div>
            <Row>
              <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                <div className='text-left mb-4'>
                  <span>Ciudad</span>
                  <Input placeholder={this.state.userLogged.address.city} id='city' value={this.state.userLogged.address.city} onChange={this.change_address}></Input>
                </div>
              </Col>
              <Col xl={4} lg={4} md={4} sm={6} xs={6}>
                <div className='text-left mb-4'>
                  <span>Provincia</span>
                  <Input placeholder={this.state.userLogged.address.province} id='province' value={this.state.userLogged.address.province} onChange={this.change_address}></Input>
                </div>
              </Col>
              <Col xl={4} lg={4} md={4} sm={6} xs={6}>
                <div className='text-left mb-4'>
                  <span>C.P.</span>
                  <Input placeholder={this.state.userLogged.address.cp} id='cp' value={this.state.userLogged.address.cp} onChange={this.change_address}></Input>
                </div>
              </Col>
            </Row>
            <div className='text-left mb-4'>
              <span>Contraseña</span>
              <Input type="password" id="user_pass" value={this.state.userLogged.user_pass} pattern=".{1,}" onChange={this.change_box}/>
            </div>
            <div>
              <Button color='secondary' onClick={this.save_button} className='mt-2'>
                Guardar
              </Button>
            </div>
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
}),)(Profile);
