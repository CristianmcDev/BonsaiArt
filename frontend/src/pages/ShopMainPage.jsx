import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainShopLayout from '../components/layouts/MainShopLayout';
import Shop from '../components/Shop/Shop';

class ShopMainPage extends Component {

    render() {
        return (<MainShopLayout >
          <div className="div-shop">
                  <Shop/>
                  </div>
                </MainShopLayout>);
    }
}
function selectStateApp(state) {
    return {app: state.app};
}
export default connect(selectStateApp, dispatch => ({}),)(ShopMainPage);
