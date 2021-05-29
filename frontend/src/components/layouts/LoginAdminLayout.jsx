import React, {Component} from 'react';
import {connect} from 'react-redux';
import background_admin from '../../imgs/background_admin.jpg'
class LoginAdminLayout extends Component {

    render() {
        return (
            <div className="account-pages">
                <img src={background_admin} alt="bg" className="bg"/>
                <div>
                    {this.props.children}
                </div>
            </div>)
    }
}

function selectStateApp(state) {
    return {userData: state.app.userLogged};
}

export default connect(selectStateApp, dispatch => ({}),)(LoginAdminLayout);
