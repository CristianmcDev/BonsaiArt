import React, {useState} from 'react';
import {connect} from 'react-redux';
import OrderListActions from '../../../actions/OrderListActions';
import {showAlert, capitalizeFirstLetter} from '../../../js/helper_functions';
import {order_status_list} from '../../../js/vars'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Label,
    Col
} from 'reactstrap'
import Select from 'react-select';
import axios from "axios";


const StateModal = (props) => {
    const [badge, setbadge] = useState('nueva')

    const options = []
    for (var i = 0; i < order_status_list.length; i++) {
        options.push({value: order_status_list[i], label: order_status_list[i]})
    }

    const modify_state = (event) => {
        setbadge(event.value)
    }
    const toggle = () => {
        props.modifyModal('StateModalOpen', !props.orderList.StateModalOpen);
    }
    const toggleSave = async () => {
        props.modifyOrderState(index_click, badge);
        showAlert("Exito", "Se cambió el estado del pedido correctamente", "success");
        await axios.put("https://bonsaiart.herokuapp.com/api/orders/"+props.orderList.order_list[index_click]._id, props.orderList.order_list[index_click])
        props.modifyModal('StateModalOpen', !props.orderList.StateModalOpen);
    }
    const index_click = props.orderList.index
        ? props.orderList.index
        : 0;

    return (<Modal centered={true} isOpen={props.orderList.StateModalOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Cambiar estado del pedido</ModalHeader>
                <ModalBody>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Label>Estado del pedido</Label>

                        {
                            props.orderList.order_list ?
                            <Select placeholder={capitalizeFirstLetter(props.orderList.order_list[index_click].order_state)} className='w-100 select-imput basic-single' onChange={modify_state} options={options} classNamePrefix="select" isSearchable={true} name="color"/> :
                            null
                        }
                    </Col>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={toggleSave} className='mr-2'>Guardar</Button>
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>)
}

function selectStateApp(state) {
    return {app: state.app, orderList: state.orderList};
}

export default connect(selectStateApp, dispatch => ({
    modifyValue: (id, value) => dispatch(OrderListActions.modifyValue(id, value)),
    modifyModal: (id, val) => dispatch(OrderListActions.modifyModal(id, val)),
    modifyOrderState: (id, val) => dispatch(OrderListActions.modifyOrderState(id, val))
}),)(StateModal);
