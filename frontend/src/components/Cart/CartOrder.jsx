import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Card, Col, Button, Input} from "reactstrap";
import Swal from 'sweetalert2'
import axios from "axios"


class CartOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {}
    };
    this.change_box = this.change_box.bind(this);
    this.get_info = this.get_info.bind(this);
    this.change_payment = this.change_payment.bind(this);
    this.change_address = this.change_address.bind(this);
    this.get_date = this.get_date.bind(this);
    this.get_order = this.get_order.bind(this);

  }
  async componentWillMount() {
    await this.setState({info: this.props.app.userLogged})

    this.setState(prevState => ({
      info: {
        ...prevState.info,
        payment: {
          name: "",
          date: "",
          number: "",
          cvc: ""
        }
      }
    }))
  }

  change_payment(event) {
    const id = event.target.id;
    const value = event.target.value;

    this.setState(prevState => ({
      info: {
        ...prevState.info,
        payment: {
          ...prevState.info.payment,
          [id]: value
        }
      }
    }))
  }

  change_address(event) {
    const id = event.target.id;
    const value = event.target.value;

    this.setState(prevState => ({
      info: {
        ...prevState.info,
        address: {
          ...prevState.info.address,
          [id]: value
        }
      }
    }))
  }

  change_box(event) {
    let info = this.state.info
    info[event.target.id] = event.target.value
    this.setState({info: info});

  }
  get_date() {
    const meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    let f = new Date();
    return (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
  }
  //comprobar que los datos de envio estan totalmente rellenados

  async get_info() {
    let todo = false;

    let new_array = Object.values(this.state.info)
    new_array.map(
      (e) => e.length == 0
      ? todo = true
      : null)

    //parte de objetos dentro del objetos
    new_array = Object.values(this.state.info.payment)
    new_array.map(
      (e) => e.length == 0
      ? todo = true
      : null)

    new_array = Object.values(this.state.info.address)
    new_array.map(
      (e) => e.length == 0
      ? todo = true
      : null)

    if (!todo) {

      //llamamos para que cree el objeto con toda la info
      const order = this.get_order();
      //se lo enviamos a la api
      await axios.post("https://bonsaiart.herokuapp.com/api/orders/", order);

      //y tambien lo ponemos en notification de admin

      await axios.post("https://bonsaiart.herokuapp.com/api/notifications/", order);

      //y despues limpiamos el carrito
      const cart = {
        user_id: this.state.info.id_user,
        order:[]
      }

      await axios.put("https://bonsaiart.herokuapp.com/api/cart/"+this.props.shop.cart._id, cart) //creamos cart del usuario

    Swal.fire({title: 'Compra finalizada', text: 'Se le añadirá en la lista de pedidos, pronto le llegará a casa ', type: 'success', confirmButtonText: 'Volver a tienda'}).then((result) => {
        if (result.value) {
          //emviamos el contenido de state a la api
          //cogemos y guardamos la fecha actual del pedidos

          window.location.href = window.location.href.slice(0, 33) + "shop"
        }
      })
    } else {
      Swal.fire({title: 'Ops....', text: 'No has rellenado toda la información', type: 'warning', confirmButtonText: 'Aceptar'})
    }
  }
  get_order(){
    const order_date = this.get_date();

    //creamos la constante preparada para ponerla en la AppActions
    const order = {
      order_user: this.state.info.id_user,
      order_state: "Nuevo",
      order_date: order_date,
      order_seen: false,
      order_subtotal:this.props.shop.cart.cart_subtotal,
      order_total:this.props.shop.cart.cart_total,
      order_address: {
        name: this.state.info.name,
        dni: this.state.info.dni,
        address: this.state.info.address.address,
        city: this.state.info.address.city,
        province: this.state.info.address.province,
        cp: this.state.info.address.cp,
        phone: this.state.info.tel,
        mobilephone: this.state.info.mobilephone
      },
      payment: {
        name: this.state.info.payment.name,
        number: this.state.info.payment.number,
        date: this.state.info.payment.date,
        cvc: this.state.info.payment.cvc
      },
      order: []
    };

    this.props.shop.cart.order.map((u) => {
      let p = {
        product_id: u.product_id,
        product_img: u.product_img,
        product_name: u.product_name,
        product_price: u.product_price,
        product_amount: u.product_amount,
        product_total: u.product_total
      }
      order.order.push(p)
    return null})

    console.log(order)
    return order;

  }

  render() {
    return (<Row>
      {console.log(this.state.info)}
      <Col className="mt-4" xl={6} lg={12} md={12} sm={12} xs={12}>
        <Card body="body" className='py-4 text-center'>
          <h4>Información de envio</h4>
          <div className='text-left mb-4 '>
            <span>Nombre</span>
            <Input placeholder={this.state.info.name} id='name' value={this.state.info.name} onChange={this.change_box}></Input>
          </div>
          <div className='text-left mb-4 '>
            <span>DNI</span>
            <Input placeholder={this.state.info.dni} id='dni' value={this.state.info.dni} onChange={this.change_box}></Input>
          </div>
          <div className='text-left mb-4'>
            <span>Correo electronico</span>
            <Input placeholder={this.state.info.email} id='email' value={this.state.info.email} onChange={this.change_box}></Input>
          </div>
          <div className='text-left mb-4'>
            <span>Dirección</span>
            <Input placeholder={this.state.info.address.address} id='address' value={this.state.info.address.address} onChange={this.change_address}></Input>
          </div>
          <Row>
            <Col xl={4} lg={4} md={4} sm={12} xs={12}>
              <div className='text-left mb-4'>
                <span>Ciudad</span>
                <Input placeholder={this.state.info.address.city} id='city' value={this.state.info.address.city} onChange={this.change_address}></Input>
              </div>
            </Col>
            <Col xl={4} lg={4} md={4} sm={6} xs={6}>
              <div className='text-left mb-4'>
                <span>Provincia</span>
                <Input placeholder={this.state.info.address.province} id='province' value={this.state.info.address.province} onChange={this.change_address}></Input>
              </div>
            </Col>
            <Col xl={4} lg={4} md={4} sm={6} xs={6}>
              <div className='text-left mb-4'>
                <span>C.P.</span>
                <Input placeholder={this.state.info.address.cp} id='cp' value={this.state.info.address.cp} onChange={this.change_address}></Input>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              <div className='text-left mb-4'>
                <span>Teléfono movil</span>
                <Input placeholder={this.state.info.mobile} id='mobile' value={this.state.info.mobile} onChange={this.change_box}></Input>
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              <div className='text-left mb-4'>
                <span>Teléfono</span>
                <Input placeholder={this.state.info.tel} id='tel' value={this.state.info.tel} onChange={this.change_box}></Input>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col className="mt-4" xl={6} lg={12} md={12} sm={12} xs={12}>
        <Card body="body" className='py-4 text-center'>
          <h4>Pago con tarjeta</h4>
          <Row>
            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
              <div className='text-left mb-4'>
                <span>Nombre titular</span>
                <Input id='name' onChange={this.change_payment}></Input>
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
              <div className='text-left mb-4'>
                <span>Número tarjeta</span>
                <Input id='number' onChange={this.change_payment}></Input>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
              <div className='text-left mb-4'>
                <span>Fecha Caducidad</span>
                <Input placeholder="MM/YYYY" id='date' onChange={this.change_payment}></Input>
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
              <div className='text-left mb-4'>
                <span>CVC</span>
                <Input id='cvc' onChange={this.change_payment}></Input>
              </div>
            </Col>
            <Button className="mx-auto" onClick={this.get_info}>
              Finalizar compra</Button>
          </Row>
        </Card>
      </Col>

    </Row>);
  }
}
function selectStateApp(state) {
  return {app: state.app, cart: state.cart, shop: state.shop};
}

export default connect(selectStateApp, dispatch => ({
}),)(CartOrder);
