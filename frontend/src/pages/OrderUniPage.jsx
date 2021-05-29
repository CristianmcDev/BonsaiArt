import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainProfileLayout from '../components/layouts/MainProfileLayout'
// import "../components/conversation/conversation.scss";
import Order from '../components/order/Order';
import {Button} from "reactstrap";
class OrderUniPage extends Component {

    render() {
        return (<MainProfileLayout>
            <Order {...this.props}/>
            <div className='text-right py-4'>
                <Button className='mr-4 btn-return' color='' onClick={() => this.props.history.goBack()}>
                    Volver
                </Button>
            </div>
        </MainProfileLayout>);
    }
}
function selectStateApp(state) {
    return {app: state.app};
}

export default connect(selectStateApp, dispatch => ({}),)(OrderUniPage);
