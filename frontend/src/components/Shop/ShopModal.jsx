import React, {useState} from 'react';
import {connect} from 'react-redux';
import ShopActions from '../../actions/ShopActions';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from 'reactstrap'
import {LinkContainer} from "react-router-bootstrap";

const ShopModal = (props) => {

    const toggle = () => {
        props.modifyModal('ShopModalOpen', !props.shop.ShopModalOpen);
    }

    return (<Modal centered={true} isOpen={props.shop.ShopModalOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Necesitas iniciar sesión</ModalHeader>
                <ModalBody>
                    <LinkContainer className='clickable' to="/login">
                      <p>Pinche aqui para iniciar sesión o crear cuenta</p>
                    </LinkContainer>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>)
}

function selectStateApp(state) {
    return {app: state.app, shop: state.shop};
}

export default connect(selectStateApp, dispatch => ({
    modifyValue: (id, value) => dispatch(ShopActions.modifyValue(id, value)),
    modifyModal: (id, val) => dispatch(ShopActions.modifyModal(id, val)),
}),)(ShopModal);
