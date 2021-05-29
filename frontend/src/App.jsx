import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';

import {
    LoginPage,
    CreateUserPage,
    LoginAdminPage,
    ErrorPage,
    OrderPage,
    OrderAdminPage,
    NotificationPage,
    OrderUniAdminPage,
    OrderUniPage,
    ProfilePage,
    ProductPage,
    ShoppingCartPage,
    ShopMainPage,
    CartOrderPage,
} from './pages';
import AppActions from './actions/AppActions';

import './css/react-table.scss'
import "./base.scss";
import "./App.scss";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLogged: {
                logged: true
            }
        };
    }

    render() {
        return (<Router>
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/newUser" component={CreateUserPage}/>
                <Route exact path="/loginAdmin" component={LoginAdminPage}/>
                <Route exact path="/404" component={ErrorPage}/>
                <Route exact path="/orderslist" component={OrderPage}/>
                <Route exact path="/admin/orderlist" component={OrderAdminPage}/>
                <Route exact path="/admin/order/:id" component={OrderUniAdminPage}/>
                <Route exact path="/order/:id" component={OrderUniPage}/>
                <Route exact path="/product/:id" component={ProductPage}/>
                <Route exact path="/shoppingCart" component={ShoppingCartPage}/>
                <Route exact path="/shoppingCart/order" component={CartOrderPage}/>
                <Route exact path="/notifications" component={NotificationPage}/>
                <Route exact path="/profile" component={ProfilePage}/>
                <Route exact path="/shop" component={ShopMainPage}/>
                <Route exact path="/" component={ShopMainPage}/>
                <Route exact path="*" render={() => (<Redirect to="/404"/>)}/>
            </Switch>
        </Router>);
    }
}

function selectStateApp(state) {
    return {appState: state.app};
}

export default connect(selectStateApp, dispatch => ({
    setLoading: (isLoading) => dispatch(AppActions.loading(isLoading))
}))(App);
