import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShopLayout from '../components/layouts/ShopLayout'
import Profile from '../components/Profile/Profile';
class ProfilePage extends Component {

    render() {
        return (<ShopLayout>
                    <Profile/>
                </ShopLayout>);
    }
}
function selectStateApp(state) {
    return {app: state.app};
}
export default connect(selectStateApp, dispatch => ({}),)(ProfilePage);
