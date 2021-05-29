import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Badge
} from "reactstrap";
import {LinkContainer} from "react-router-bootstrap";
import logoBonsai from '../../imgs/Logo_bonsaiArt.ico'
import {MdNotifications, MdReorder, MdContentPaste, MdExitToApp} from 'react-icons/md';

import AppActions from '../../actions/AppActions';


class HeaderAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props)
    this.logout = this.logout.bind(this);

  }

  logout() {
    const userLogged = {
      logged: false
    }

    this.props.setUserLogged({userLogged: userLogged})
  }

  render() {
    return (<div className='main-header'>
      <Row className='py-0 mx-0'>
        <Col className='mr-auto py-2 ' xl={3} lg={3} md={2} sm={4} xs={4}>
          <LinkContainer className='clickable' to="/admin/orderlist">
            <img className='' height='40px' src={logoBonsai} alt="Bonsai Art logo"/>
          </LinkContainer>
        </Col>
        <Col className='ml-auto  ml-2' xl={9} lg={9} md={10} sm={8} xs={8}>
          <Row className='navbar-button-group pt-3'>
            <LinkContainer className={'clickable ' + (
                window.location.pathname === "/admin/orderlist"
                ? 'active'
                : '')} to="/admin/orderlist">
              <span className='icons-navbar'>
                <MdContentPaste/>
                <span className='text-bar d-none d-xl-inline-block d-lg-inline-block d-md-inline-block d-sm-none'>Pedidos</span>
              </span>
            </LinkContainer>
            <LinkContainer className={'clickable ' + (
                window.location.pathname === "/notifications"
                ? 'active'
                : '')} to="/notifications">
              <span className='icons-navbar'>
                <MdNotifications/>
                <span className='text-bar d-none d-xl-inline-block d-lg-inline-block d-md-inline-block d-sm-none'>Notificaciones
                  <Badge className='badge-notification'>{this.props.notification.notification_num}</Badge>
                </span>
              </span>
            </LinkContainer>
            <LinkContainer className='clickable ' to="/shop" title="Cerrar Sesion">
              <div className='option-bar pr-4' onClick={this.logout}>
                <MdExitToApp/>
              </div>
            </LinkContainer>
          </Row>
        </Col>
      </Row>
    </div>);
  }
}
function selectStateApp(state) {
  return {app: state.app, notification: state.notification};
}

export default connect(selectStateApp, dispatch => ({
  setUserLogged: (user) => dispatch(AppActions.setUserLogged(user)),
}),)(HeaderAdmin);
