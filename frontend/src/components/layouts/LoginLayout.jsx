import React, {Component} from 'react';
import {connect} from 'react-redux';
import login_background from '../../imgs/login_background.jpg'
class LoginLayout extends Component {

    render() {
        return (
            <div className="account-pages">
                <img src={login_background} alt="bg" className="bg"/>
                <div>
                    {this.props.children}
                </div>
            </div>)
    }
}

function selectStateApp(state) {
    return {userData: state.app.userLogged};
}

export default connect(selectStateApp, dispatch => ({}),)(LoginLayout);
