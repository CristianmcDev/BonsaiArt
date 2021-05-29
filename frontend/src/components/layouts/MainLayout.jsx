import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Col} from 'reactstrap';

import HeaderAdmin from '../header/HeaderAdmin'

class MainLayout extends Component {
    render() {
        return (
            <div className="main-layout">
                    <HeaderAdmin/>
                    <Col className='main-content mx-auto' xl={10} lg={10} md={11} sm={12} xs={12}>
                        {this.props.children}
                    </Col>
            </div>)
    }
}

function selectStateApp(state) {
    return {userData: state.app.userLogged};
}

export default connect(selectStateApp, dispatch => ({}),)(MainLayout);
