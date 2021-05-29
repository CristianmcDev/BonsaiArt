import React, {Component} from 'react';
import {connect} from 'react-redux';

import ShopLayout from '../components/layouts/ShopLayout'
import CartOrder from "../components/Cart/CartOrder";
class CartOrderPage extends Component {

    render() {
        return (<ShopLayout>
                  <CartOrder/>
                </ShopLayout>);
    }
}

function selectStateApp(state) {
    return {app: state.app};
}

export default connect(selectStateApp, dispatch => ({}),)(CartOrderPage);
