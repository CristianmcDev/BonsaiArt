import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainLayout from '../components/layouts/MainLayout'
// import "../components/conversation/conversation.scss";
import Order from '../components/order/Order';
import {Button} from "reactstrap";
class OrderUniAdminPage extends Component {

    render() {
        return (<MainLayout>
            <Order {...this.props}/>
            <div className='text-right py-4'>
                <Button className='mr-4 btn-return' color='' onClick={() => this.props.history.goBack()}>
                    Volver
                </Button>
            </div>
        </MainLayout>);
    }
}
function selectStateApp(state) {
    return {app: state.app};
}

export default connect(selectStateApp, dispatch => ({}),)(OrderUniAdminPage);
