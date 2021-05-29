import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Col} from 'reactstrap';

import Header from '../header/Header'
import HeaderunLoged from '../header/HeaderunLoged'

class MainProfileLayout extends Component {
    render() {
        return (
            <div className="main-layout">
            {
              this.props.userData ?
              <Header/>:
              <HeaderunLoged/>
            }
                    <Col className='main-content mx-auto ml-4' xl={12} lg={12} md={12} sm={12} xs={12}>
                        {this.props.children}
                    </Col>
            </div>)
    }
}

function selectStateApp(state) {
    return {userData: state.app.userLogged.logged};
}

export default connect(selectStateApp, dispatch => ({}),)(MainProfileLayout);
