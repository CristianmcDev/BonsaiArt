import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
} from "reactstrap";
import {LinkContainer} from "react-router-bootstrap";
import logoBonsai from '../../imgs/Logo_bonsaiArt.ico'
import ShopActions from '../../actions/ShopActions';

class HeaderunLoged extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.modify_searchbox = this.modify_searchbox.bind(this);
  }

  modify_searchbox(event){
    console.log(event.target.value)

    this.props.modifyValue("searchbox", event.target.value);
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
  modifyValue: (id, value) => dispatch(ShopActions.modifyValue(id, value)),
}),)(HeaderunLoged);
