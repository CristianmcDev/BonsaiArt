import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import {LinkContainer} from "react-router-bootstrap";
import logoBonsai from '../../imgs/Logo_bonsaiArt.ico'
import {MdReorder, MdFace, MdAssignment, MdExitToApp, MdShoppingCart} from 'react-icons/md';
import ShopActions from '../../actions/ShopActions';
import AppActions from '../../actions/AppActions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.modify_searchbox = this.modify_searchbox.bind(this);
    this.logout = this.logout.bind(this);
  }

  modify_searchbox(event){
    console.log(event.target.value)

    this.props.modifyValue("searchbox", event.target.value);
  }

  logout(){
    const userLogged = {logged: false}

    this.props.setUserLogged({userLogged: userLogged})
  }

  render() {
    return (<div className='header'>
      <Row className='py-0 mx-0'>
        <Col className='mr-auto py-2 ' xl={4} lg={4} md={4} sm={4} xs={4}>
          <LinkContainer className='clickable' to="/shop">
            <img className='' height='40px' src={logoBonsai} alt="Bonsai Art logo"/>
          </LinkContainer>
        </Col>
        <Col className='ml-auto  ml-2' xl={3} lg={3} md={3} sm={3} xs={3}>
          <Row className='navbar-button-group pt-3'>
          <LinkContainer className='clickable option-bar' to="/shoppingCart">
              <MdShoppingCart/>
          </LinkContainer>

            <UncontrolledDropdown>
              <DropdownToggle tag="div" className=' ml-2 clickable'>
                <div className='option-bar pr-4'>
                  <MdReorder/>
                </div>
              </DropdownToggle>
              <DropdownMenu right="right">
                <DropdownItem className='' header="header">
                  <LinkContainer className='clickable' to="/profile">
                    <div>
                      <MdFace/>
                      <text className="pl-2">Perfíl</text>
                    </div>
                  </LinkContainer>
                </DropdownItem>
                <DropdownItem className='' header="header">
                  <LinkContainer className='clickable' to="/orderslist">
                    <div>
                      <MdAssignment/>
                      <text className="pl-2">Lista de pedidos</text>
                    </div>
                  </LinkContainer>
                </DropdownItem>
                <DropdownItem className='' header="header">
                  <LinkContainer className="clickable" to="/shop" title="Cerrar Sesion">
                    <div>
                      <MdExitToApp />
                      <text onClick={this.logout} className="pl-2">Cerrar sesión</text>
                    </div>
                  </LinkContainer>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Row>
        </Col>
      </Row>
    </div>);
  }
}
function selectStateApp(state) {
  return {app: state.app, shop: state.shop};
}

export default connect(selectStateApp, dispatch => ({
  modifyValue: (id, value) => dispatch(ShopActions.modifyValue(id, value)),
  setUserLogged: (user) => dispatch(AppActions.setUserLogged(user)),
}),)(Header);
