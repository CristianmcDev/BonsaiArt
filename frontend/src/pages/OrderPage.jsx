import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShopLayout from '../components/layouts/ShopLayout'
import OrderList from '../components/order/OrderList';
class OrderPage extends Component {

    render() {
        return (<ShopLayout>
                  <OrderList/>
                </ShopLayout>);
    }
}
function selectStateApp(state) {
    return {app: state.app};
}

export default connect(selectStateApp, dispatch => ({}),)(OrderPage);
