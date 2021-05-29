import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import {LinkContainer} from "react-router-bootstrap";
import logoBonsai from '../../imgs/Logo_bonsaiArt.ico'
import {
  MdSearch,
  MdDehaze
} from 'react-icons/md';
import ShopActions from '../../actions/ShopActions';

class HeaderShopunLoged extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.modify_searchbox = this.modify_searchbox.bind(this);
    this.modify_sidebar = this.modify_sidebar.bind(this);
  }

  modify_searchbox(event) {
    this.props.modifyValue("searchbox", event.target.value);
  }

  modify_sidebar(){
    this.props.modifyValue("sidebar", !this.props.shop.sidebar);
  }

  render() {
    return (<div className='main-header'>
      <Row className='py-0 mx-0'>
        <Col className='mr-auto py-2 ' xl={4} lg={4} md={4} sm={4} xs={4}>
          <InputGroup className='input-group-append'>
            <LinkContainer className='clickable' to="/shop">
              <img height='40px' src={logoBonsai} alt="Bonsai Art logo"/>
            </LinkContainer>
            <InputGroupAddon>
              <Button color="" className="ml-2 option-bar" onClick = {this.modify_sidebar}><MdDehaze style={{fontSize: 30}}/></Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col className='mt-2' xl={5} lg={5} md={5} sm={5} xs={5}>
          <InputGroup className='input-group-append'>
            <Input className='w-75' placeholder='Barra de busqueda' onChange={this.modify_searchbox}/>
            <InputGroupAddon>
              <Button className="btn-search" disabled={true}><MdSearch style={{
        fontSize: 20
      }}/></Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col className='ml-auto  ml-2' xl={3} lg={3} md={3} sm={3} xs={3}>
          <Row className='navbar-button-group pt-3'>

            <LinkContainer className='clickable my-auto mr-2' to="/login">
              <p>Iniciar sesion</p>
            </LinkContainer>
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
  modifyValue: (id, value) => dispatch(ShopActions.modifyValue(id, value))
}),)(HeaderShopunLoged);
