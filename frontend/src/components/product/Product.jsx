import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Card, Col, Button} from "reactstrap";
import axios from "axios";
import ShopActions from '../../actions/ShopActions';
import ShopModal from '../Shop/ShopModal';

class Product extends Component {
  constructor(props) {
      super(props);
      this.state = {
        product: {},
        cart: {}
      };
      this.modify_cart = this.modify_cart.bind(this);
      this.switchModalVisibility = this.switchModalVisibility.bind(this);
  }

  async componentDidMount(){
      const id_url = window.location.href.slice(41);//para coger solo el id del producto
    const product = await axios.get("https://bonsaiart.herokuapp.com/api/products/"+id_url);

    this.setState({product: product.data})
  }

  switchModalVisibility(id) {
    this.props.modifyModal(
      id, id in this.props.shop
      ? !this.props.shop[id]
      : true)
  }

  async modify_cart(event) { //para limitar la introduccion del carrito sin estar logeado
    const id_product = event.target.id
    if (!this.props.app.userLogged.logged) {
      this.switchModalVisibility('ShopModalOpen');
    } else {

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


  render() {
    let url_img = "";
    // hecho porque no cargaba el state y para el primer renderizado no explote
    if(!this.state.product.product_img){
      url_img = require("../../imgs/img-error.jpg") ;
    }else{
      url_img = require("../../imgs/"+this.state.product.product_img+".jpg") ;
    }
      return (
        <div className=''>
        <ShopModal/>
          <Row>
            <Col className='mt-4' xl={5} lg={5} md={12} sm={12} xs={12}>
              <Card  body="body">
              <img src={url_img} alt={this.state.product.product_name}/>
              </Card>
            </Col>
            <Col className='mt-4' xl={7} lg={7} md={12} sm={12} xs={12}>
              <Card  body="body">
                <h4 className="my-4 text-bold">{this.state.product.product_name}</h4>
                <h5>Precio: {this.state.product.product_price} €</h5>
                <div className="mt-4">
                  <Button id={this.state.product._id} className="ml-4 mt-4" onClick={this.modify_cart}>Añadir al carrito</Button>
                </div>
              </Card>
              <Card className="mt-2" body="body">
                <h4 className="my-4 text-bold">Información del producto</h4>
                <p className="text-justify">{this.state.product.product_info}</p>
              </Card>
            </Col>
          </Row>
        </div>);
  }
}

function selectStateApp(state) {
    return {app: state.app, order: state.order, shop: state.shop};
}

export default connect(selectStateApp, dispatch => ({
  modifyModal: (id, value) => dispatch(ShopActions.modifyModal(id, value)),
  modifyValue: (id, value) => dispatch(ShopActions.modifyValue(id, value)),
}),)(Product);
