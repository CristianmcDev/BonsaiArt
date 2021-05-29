import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainLayout from '../components/layouts/MainLayout'
import Notification from '../components/Notification/Notification';
class NotificationPage extends Component {

    render() {
        return (<MainLayout>

            <Notification/>

        </MainLayout>);
    }
}
function selectStateApp(state) {
    return {app: state.app};
}

export default connect(selectStateApp, dispatch => ({}),)(NotificationPage);
