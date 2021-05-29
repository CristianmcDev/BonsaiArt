import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Col} from 'reactstrap';

import HeaderShop from '../header/HeaderShop'
import HeaderShopunLoged from '../header/HeaderShopunLoged'
import Sidebar from '../sidebar/Sidebar';

class MainShopLayout extends Component {
    render() {
        return (
            <div className="main-layout">
            {
              this.props.userData.logged ?
              <HeaderShop/>:
              <HeaderShopunLoged/>
            }
                    <Sidebar/>
                    <Col className='main-content mx-auto' xl={12} lg={12} md={12} sm={12} xs={12}>
                        {this.props.children}
                    </Col>
            </div>
      )
    }
}

function selectStateApp(state) {
    return {userData: state.app.userLogged};
}

export default connect(selectStateApp, dispatch => ({}),)(MainShopLayout);
