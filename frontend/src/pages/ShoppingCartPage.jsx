import React, {Component} from 'react';
import {connect} from 'react-redux';

import ShopLayout from '../components/layouts/ShopLayout'

import ShoppingCart from "../components/Cart/ShoppingCart";
class ShoppingCartPage extends Component {

    render() {
        return (<ShopLayout>
                  <ShoppingCart/>
                </ShopLayout>);
    }
}

function selectStateApp(state) {
    return {app: state.app};
}

export default connect(selectStateApp, dispatch => ({}),)(ShoppingCartPage);
