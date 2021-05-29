import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Card, Col, Button} from "reactstrap";
import axios from "axios";

import ShopActions from '../../actions/ShopActions';
import OrderListActions from '../../actions/OrderListActions';
import ShopModal from './ShopModal';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: {}
    }
    this.get_cardProduct = this.get_cardProduct.bind(this);
    this.go_details = this.go_details.bind(this);
    this.modify_cart = this.modify_cart.bind(this);
    this.switchModalVisibility = this.switchModalVisibility.bind(this);
  }

  async componentDidMount() {
    this.props.resetState();
    const products = await axios.get("https://bonsaiart.herokuapp.com/api/products");
    this.setState({products: products.data});

    if (!this.props.app.userLogged.logged) {} else { //mandamos a la api, el nuevo producto
      //cogemos todos los carrito
      let cart = await axios.get("https://bonsaiart.herokuapp.com/api/cart")

      // de esta manera sacamos el carrito del id conectado
      cart = cart.data.filter((u) => {
        if (u.user_id == this.props.app.userLogged.id_user) {
          return u
        }
        return null
      })
      //lo guardamos en state coge el primero ya que no hay otros despues del filtraje
      //de esta manera coge el objeto, no el array de un solo objeto
      this.setState({cart: cart[0]})
    }
    this.props.modifyValue("cart", this.state.cart)
  }

  switchModalVisibility(id) {
    this.props.modifyModal(
      id, id in this.props.shop
      ? !this.props.shop[id]
      : true)
  }

  go_details(pro) {
    window.location.href = window.location.href.slice(0, 33) + "product/" + `${pro.target.id}`
  }

  async modify_cart(event) { //para limitar la introduccion del carrito sin estar logeado
    const id_product = event.target.id
    if (!this.props.app.userLogged.logged) {
      this.switchModalVisibility('ShopModalOpen');
    } else {
      //primero tenemos que comprobar que no este ya, y si es asi sumerle el product_amount
      const yp = this.state.cart.order.find(p => p.product_id == id_product);
      let new_cart = this.state.cart;
      //si esta repe, que se suma uno mas y si no que haga el push entero del producto
      if (yp) {
        new_cart.order = this.state.cart.order.map((t) => {
          if (t.product_id == id_product) {
            t.product_amount = t.product_amount + 1
          }
          return t
        })
      } else {
        //sacamos la informacion del producto que hemos añadido
        let product = await axios.get("https://bonsaiart.herokuapp.com/api/products/" + id_product)
        product = product.data;

        const new_product = {
          product_id: product._id,
          product_img: product.product_img,
          product_name: product.product_name,
          product_price: product.product_price,
          product_amount: 1
        }
        // le añadimos el producto nuevo
        new_cart.order.push(new_product);

      }
      this.setState({cart: new_cart})

      // y modificamos la api de cart
      await axios.put("https://bonsaiart.herokuapp.com/api/cart/" + this.state.cart._id, this.state.cart);

      let more = this.props.shop.cart_number + 1;
      this.props.modifyValue("cart_number", more)

      // y lo añadimos a shop props
      this.props.modifyValue("cart", this.state.cart)
    }
  }

  get_cardProduct() {

    let list_products = this.state.products.map((pro) => {
      // es la criba de la searchbox del header de productos
      let res = [];
      //preparo la url de la imagen, ya que no me va de otra forma
      const url_img = require("../../imgs/" + pro.product_img + ".jpg");

      if (this.props.shop.category == "principal") {

        if (pro.product_name.toLowerCase().indexOf(this.props.shop.searchbox.toLowerCase()) !== -1) {

          return (<Col className='px-0 mb-2' xl={3} lg={3} md={6} sm={6} xs={12}>
            <Card body="body" className="card-product m-2 text-center '">
              <img src={url_img} className='mb-4' height="350px" alt={pro.product_name}/>
              <h4 className="font-weight-bold mb-2">{pro.product_name}</h4>
              <h4>{pro.product_price}
                €</h4>
              <Row className="btns-card-shop">
                <Button id={pro._id} className="ml-4 mt-4" onClick={this.go_details}>Detalles</Button>
                <Button id={pro._id} className="ml-4 mt-4" onClick={this.modify_cart}>Añadir al carrito</Button>
              </Row>
            </Card>
          </Col>)
        }
      } else if (pro.product_category == this.props.shop.category) {
        if (pro.product_name.toLowerCase().indexOf(this.props.shop.searchbox.toLowerCase()) !== -1) {
          return (<Col className='px-0 mr-auto mb-2' xl={3} lg={3} md={6} sm={6} xs={12}>
            <Card body="body" className="card-product m-2 text-center '">
              <img className='mb-4' height="350px" src={url_img} alt={pro.product_name}/>
              <h4 className="font-weight-bold">{pro.product_name}</h4>
              <h4>{pro.product_price}
                €</h4>
              <Row className="btns-card-shop">
                <Button id={pro._id} className="ml-4 mt-4" onClick={this.go_details}>Detalles</Button>
                <Button id={pro._id} className="ml-4 mt-4" onClick={this.modify_cart}>Añadir al carrito</Button>
              </Row>
            </Card>
          </Col>)
        }
      }
      return null
    })
    return list_products;
  }

  render() {
    return (<div>
      <ShopModal/>
      <h4 className="mt-2 ml-3">{this.props.shop.category.toUpperCase()}</h4>
      <Row className=" mt-4 ml-2">
        {this.get_cardProduct()}
      </Row>
    </div>)
  }
}

function selectStateApp(state) {
  return {app: state.app, shop: state.shop};
}

export default connect(selectStateApp, dispatch => ({
  modifyValue: (id, value) => dispatch(ShopActions.modifyValue(id, value)),
  modifyModal: (id, value) => dispatch(ShopActions.modifyModal(id, value)),
  resetState: () => dispatch(OrderListActions.resetState())
}),)(Shop);
