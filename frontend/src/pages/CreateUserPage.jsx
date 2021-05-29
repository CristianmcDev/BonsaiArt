import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginLayout from '../components/layouts/LoginLayout'
import NewUser from '../components/User/NewUser';

class CreateUserPage extends Component {

    render() {
        return (<LoginLayout>
                    <NewUser/>
                </LoginLayout>);
    }
}
function selectStateApp(state) {
    return {app: state.app};
}
export default connect(selectStateApp, dispatch => ({}),)(CreateUserPage);
