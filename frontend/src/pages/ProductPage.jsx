import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShopLayout from '../components/layouts/ShopLayout'
import Product from '../components/product/Product';

class ProductPage extends Component {

    render() {
        return (<ShopLayout>
                  <Product/>
                </ShopLayout>);
    }
}
function selectStateApp(state) {
    return {app: state.app};
}

export default connect(selectStateApp, dispatch => ({}),)(ProductPage);
