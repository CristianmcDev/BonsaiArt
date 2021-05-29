import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Card,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import ReactTable from 'react-table'
import {MdDelete, MdAdd, MdRemove} from 'react-icons/md';
import axios from "axios";

import AppActions from '../../actions/AppActions';
import {changeDotToComma} from '../../js/helper_functions';
import Swal from 'sweetalert2'

import {base_react_table_props} from '../../js/vars'

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
    this.get_totalPrice = this.get_totalPrice.bind(this);
    this.delete_productCart = this.delete_productCart.bind(this);
    this.get_subtotal = this.get_subtotal.bind(this);
    this.get_total = this.get_total.bind(this);
    this.get_info = this.get_info.bind(this);
    this.change_box = this.change_box.bind(this);
    this.change_amount = this.change_amount.bind(this);
    this.change_all = this.change_all.bind(this);
    this.save_TotalPrices = this.save_TotalPrices.bind(this);

  }

  async componentWillMount() {
    let cart = await axios.get("https://bonsaiart.herokuapp.com/api/cart/" +this.props.shop.cart._id);

    cart = cart.data;
    this.setState({cart: cart})
  }
  async change_all(cart){

    this.setState({cart: cart})

    this.props.modifyValue("cart",this.state.cart)

    await axios.put("https://bonsaiart.herokuapp.com/api/cart/"+this.props.shop.cart._id, cart) //creamos cart del usuario

  }
  //para guardar el precio total de cada producto, el subtotal y el total global
  save_TotalPrices(){
    let cart = this.props.shop.cart;

    //total por producto
    cart.order.map((c) =>
        c.product_total = parseFloat(this.get_totalPrice(c))
    )
    console.log("cart con total",cart)

    //subtotal y total
    cart.cart_subtotal = this.get_subtotal();
    cart.cart_total = parseFloat(this.get_total());
    this.change_all(cart)
  }

  get_totalPrice(row) {
    return (row.product_price * row.product_amount).toFixed(2) + " €";
  }

  delete_productCart(row) {
    let delete_cart = this.props.shop.cart;
    let num = 0 ;
    delete_cart.order = delete_cart.order.filter(c => {
      //guardamos el num de la cantidad que hemso eliminado apora el badge del Carrito
      if(row.product_id == c.product_id){
        num = row.product_amount;
      }
      return row.product_id != c.product_id})
    let more = this.props.shop.cart_number - num;
    this.props.modifyValue("cart_number", more)

    this.change_all(delete_cart)
  }

  get_subtotal() {
    let subtotal = 0;
    this.props.shop.cart.order.map((c) => subtotal += parseFloat(this.get_totalPrice(c)))
    return changeDotToComma(subtotal.toFixed(2));
  }

  get_total() {
    let total = this.get_subtotal() + 3.95;
    return changeDotToComma(total).toFixed(2);
  }

  //comprobar que los datos de envio estan totalmente rellenados
  async get_info() {

    if (this.props.shop.cart.order.length > 0) {
      //añadimos el total de precios por producto
    this.save_TotalPrices();

    await axios.put("https://bonsaiart.herokuapp.com/api/cart/" +this.props.shop.cart._id, this.state.cart);

      //primero guardamos los datos, tales como
      window.location.href = window.location.href + "/order";
    } else {

      Swal.fire({title: 'Ops....', text: 'No hay productos en el carrito', type: 'warning', confirmButtonText: 'Volver a tienda'}).then((result) => {
        if (result.value) {
          window.location.href = window.location.href.slice(0, 33) + "shop"
        }
      })
    }
  }

  change_box(event) {
    let cart = this.props.shop.cart;
    cart.order.map((e) => {
      if (e.product_id == event.target.id)
        e.product_amount = event.target.value
    })
    this.change_all(cart)
  }

  //recibe el objeto y el numero, 1 = sumar, 0 = restar
  change_amount(row, num) {
    let cart = this.props.shop.cart;
    cart.order.map((e) => {
      if (e.product_id == row.product_id) {
        if (num == 1) {
          e.product_amount = parseInt(e.product_amount) + 1
        } else {
          //aqui comprobamos si se quedaria a 0, y si es asi lo Elimina
          if(parseInt(e.product_amount) - 1 == 0){
            this.delete_productCart(row)
          }else{
          e.product_amount = parseInt(e.product_amount) - 1}
        }
      }
    })
    //cambiamos el state, el props y la api
    this.change_all(cart)
  }

  render() {
    let display_cart = this.props.shop.cart.order;

    let table_props = {
      ...base_react_table_props,
      showPagination: display_cart.length > 5,
      defaultPageSize: Math.min(display_cart.length, 5),
      showPaginationBottom: display_cart.length > 5

    }
    const url_img = require("../../imgs/zelkova.jpg");

    let table_columns = [
      {
        Header: 'Producto',
        accessor: (row) => <span className="img-dis text-align"><img className='' height='100px' src={require("../../imgs/" + row.product_img + ".jpg")} alt={row.product_name}/></span>,
        id: 'image',
        sortable: false,
        resizable: false,
        width: 150
      }, {
        Header: 'Nombre',
        accessor: 'product_name',
        sortable: false
      }, {
        Header: 'Precio unidad',
        id: "price_uni",
        accessor: (row) => row.product_price + " €",
        sortable: false,
        resizable: false
      }, {
        Header: 'Cantidad',
        id: "amount",
        accessor: (row) => <span>
          <InputGroup>
            <Input id={row.product_id} value={row.product_amount} onChange={this.change_box}/>
            <InputGroupAddon addonType="append">
              <Button id={row.product_id} value="0" color="" className="p-0" onClick={() => this.change_amount(row, 0)}><MdRemove/></Button>
              <Button id={row.product_id} value="1" color="" className="p-0" onClick={() => this.change_amount(row, 1)}><MdAdd/></Button>
            </InputGroupAddon>
          </InputGroup>
        </span>,
        sortable: false,
        resizable: false,
        width: 120
      }, {
        Header: 'Total',
        id: 'total',
        accessor: (row) => this.get_totalPrice(row),
        sortable: false,
        resizable: false
      }, {
        Header: 'Eliminar',
        id: 'link',
        width: 100,
        accessor: (row) => <span>
          <Button color='' className='p-0' id='btn-del' onClick={() => this.delete_productCart(row)}>
            <MdDelete className='icon_delete'/>
          </Button>
        </span>,
        sortable: false,
        resizable: false
      }
    ]

  //  const url_img = require("../../imgs/" + pro.product_img + ".jpg");


    return (<div className="mt-4">
      <h3>Carrito de la compra</h3>
      <Row className="mr-0 my-4">
        <Button className='ml-3 ' onClick={async () => {
          await axios.put("https://bonsaiart.herokuapp.com/api/cart/" +this.props.shop.cart._id, this.state.cart);
          window.location.href = window.location.href.slice(0, 33) + "shop"}}>
          Sequir comprando
        </Button>
        <Button className='ml-auto ' onClick={this.get_info}>
          Comprar
        </Button>
      </Row>

      <Card body="body" className='py-4'>
        {
          display_cart.length > 0
            ? <Row className='mx-0'>
                <ReactTable columns={table_columns} data={display_cart} {...table_props}/>
              </Row>
            : <h5 className='text-center mt-2'>No productos en en carrito</h5>
        }
        <span className="mx-4 mt-4">
          <Row>
            <p>Subtotal</p>
            <p className="ml-auto">{this.get_subtotal()}
              €</p>
          </Row>
          <Row>
            <p>Cargos de envio</p>
            <p className="ml-auto">3,95 €</p>
          </Row>
          <Row>
            <h4 className='sub_title'>Total general</h4>
            <h4 className='sub_title ml-auto'>{this.get_total()}
              €</h4>
          </Row>
        </span>
      </Card>
    </div>);
  }
}
function selectStateApp(state) {
  return {app: state.app, shop: state.shop};
}

export default connect(selectStateApp, dispatch => ({
  modifyValue: (id, value) => dispatch(AppActions.modifyValue(id, value)),
}),)(ShoppingCart);
