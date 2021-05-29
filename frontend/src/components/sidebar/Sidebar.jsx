import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {LinkContainer} from "react-router-bootstrap";
import {
  Button,
  Row,
} from "reactstrap";

import ShopActions from '../../actions/ShopActions';


 const Sidebar = (props) => {

   useEffect(() => {
     !props.shop.sidebar ?
     document.getElementById('sidebar').style.marginLeft = '-200px'
     :
     document.getElementById('sidebar').style.marginLeft = '0px'
   },[props.shop.sidebar]);

  return (
    <div className="sidebar" id="sidebar">

    <h4 className="mt-4 font-weight-bold">Bonsai Art</h4>
      <Button color="" className='mt-4 btn-sidebar' onClick={() =>props.modifyValue('category', "principal")}>
        Principal
      </Button>

      <Button color="" className='mt-4 btn-sidebar' onClick={() =>props.modifyValue('category', "bonsai")}>
        Bonsai
      </Button>

      <Button color=""  className='mt-4 btn-sidebar' onClick={() =>props.modifyValue('category', "sustrato")}>
        Sustratos
      </Button>

      <Button color=""  className='mt-4 btn-sidebar' onClick={() =>props.modifyValue('category', "abono")}>
        Abono
      </Button>

      <Button color=""  className='mt-4 btn-sidebar' onClick={() =>props.modifyValue('category', "cicatrizante")}>
        Cicatrizantes
      </Button>

      <Button color=""  className='mt-4 btn-sidebar' onClick={() =>props.modifyValue('category', "herramienta")}>
        Herramientas y accesorios
      </Button>

      <Button color=""  className='mt-4 btn-sidebar' onClick={() =>props.modifyValue('category', "maceta")}>
        Macetas
      </Button>

      <Button color=""  className='mt-4 btn-sidebar' onClick={() =>props.modifyValue('category', "kakemono")}>
        Kakemonos
      </Button>

      <Button color=""  className='mt-4 btn-sidebar' onClick={() =>props.modifyValue('category', "koinobori")}>
        Banderas Koinobori
      </Button>
    </div>
  )
}

function selectStateApp(state) {
    return {app: state.app, shop: state.shop};
}

export default connect(selectStateApp, dispatch => ({
    modifyValue: (id, value) => dispatch(ShopActions.modifyValue(id, value)),
}),)(Sidebar);
