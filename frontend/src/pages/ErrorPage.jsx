import React, {Component} from 'react';
// import AppActions from '../../actions/AppActions';
import {connect} from 'react-redux';
import {Row, Col, Button} from "reactstrap";
import LoginLayout from '../components/layouts/LoginLayout'
import logoBonsai from '../imgs/Logo_bonsaiArt.ico'


class ErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<LoginLayout>
            <Row className="mr-0">
                <Col className='p-0 ml-auto' xl={3} lg={4} md={4} sm={8} xs={12}>
                    <div className="px-4  card-login">
                        <div className='w-100'>
                            <div className="text-center w-75 m-auto">
                                <img className='pb-4 logoBonsai' src={logoBonsai} alt="BonsaiArt logo"/>
                                <h4 className="text-dark-50 text-center mt-0 title">Error 404</h4>
                                <p className="text-muted mb-4 ">
                                    No hemos podido encontrar la página que buscas.
                                </p>
                                <Button color="primary" onClick={() => this.props.history.goBack()}>
                                    Volver
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </LoginLayout>);
    }
}
function selectStateApp(state) {
    return {};
}

export default connect(selectStateApp)(ErrorPage);
