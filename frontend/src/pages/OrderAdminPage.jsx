import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainLayout from '../components/layouts/MainLayout'
import OrderAdminList from '../components/order/OrderAdminList';
class OrderPage extends Component {

    render() {
        return (<MainLayout>
                  <OrderAdminList/>
                </MainLayout>);
    }
}
function selectStateApp(state) {
    return {app: state.app};
}

export default connect(selectStateApp, dispatch => ({}),)(OrderPage);
