import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Card, Col} from "reactstrap";
import ReactTable from 'react-table'
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md';
import axios from "axios";

import {base_react_table_props} from '../../js/vars'
import PulseLoader from 'react-spinners/PulseLoader';
import OrderActions from '../../actions/OrderActions';


class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {},
            show_adress: false,
            //show_adress_invoice: false
        };
    };

    get_loader() {
        return (<Col className='my-5 text-center'>
            <PulseLoader sizeUnit={"px"} size={15} color={'#ffffff'}/>
        </Col>)
    }

    async componentWillMount() {
      //const order = axios.get("https://bonsaiart.herokuapp.com/api/orders/"+this.props.match.params.id)
      const order = this.props.orderList.order_list.filter((order) => {
        if(order._id == this.props.match.params.id){
          return order
        }
      })
      //si no esta con el id en lista, tiene que estar en notifications
      if(!order[0]){
         order[0] = await axios.get("https://bonsaiart.herokuapp.com/api/orders/"+this.props.match.params.id)
         order[0]= order[0].data
      }
      if(!order[0]){
         order[0] = await axios.get("https://bonsaiart.herokuapp.com/api/notifications/"+this.props.match.params.id)
         order[0]= order[0].data
      }

      this.setState({order: order[0]})

      this.props.modifyValue("order", order[0])
    }

    render() {

        let display_data = this.props.order.order.order
        let table_props = {
            ...base_react_table_props,
            showPagination: display_data.length > 5,
            defaultPageSize: Math.min(display_data.length, 5),
            showPaginationBottom: display_data.length > 5
        }

        let table_columns = [
            {
                Header: 'Imagen',
                accessor: (row) => <span className="img-dis text-align"><img className='' height='100px' src={require("../../imgs/" + row.product_img + ".jpg")} alt={row.product_name}/></span>,
                id: 'image',
            }, {
                Header: 'Producto',
                accessor: 'product_name'
            }, {
                Header: 'Precio Unidad (IVA incluido)',
                id:"product_price",
                accessor: (row) =>
                   row.product_price + " €"

            }, {
                Header: 'Unidades',
                accessor: 'product_amount'
            }, {
                Header: 'Total (IVA incluido)',
                id:"product_total",
                accessor: (row) =>
                   row.product_total + " €"
            }
        ]

        return (<div className=''>
            <h3 className='mt-2 mb-0 py-4 title'>Pedido #
                {this.props.match.params.id}</h3>
            <Card body="body" className='mb-4 card-order'>
                <h4 className='sub_title pb-2'>Dirección de envio
                    <span className='clickable' onClick={() => this.setState({
                            show_adress: !this.state.show_adress
                        })}>{
                            !this.state.show_adress
                                ? <MdKeyboardArrowDown/>
                                : <MdKeyboardArrowUp/>
                        }</span>
                </h4>
                <div className='text-bold pb-4' hidden={!this.state.show_adress}>
                    <span>Nombre:
                    </span>
                    <span className='dir_span'>
                        {' '}
                        {this.props.order.order.order_address.name}
                        {' '}
                        (DNI: {this.props.order.order.order_address.dni})
                    </span><br/>
                    <span >Dirección:
                    </span>
                    <span className='dir_span'>
                        {' '}
                        {this.props.order.order.order_address.address}
                    </span><br/>
                    <span>Población:
                    </span>
                    <span className='dir_span'>
                        {' '}
                        {this.props.order.order.order_address.city}
                        ({this.props.order.order.order_address.province}), {this.props.order.order.order_address.cp}, España
                    </span><br/>
                    <span className=''>
                        {' '}
                        Teléfono:
                    </span>
                    <span className='dir_span'>
                        {' '}
                        {this.props.order.order.order_address.phone}
                    </span>
                </div>
            </Card>
            <Card body="body" className='py-4'>
                <Col className='px-0 mr-auto mb-2' xl={12} lg={12} md={12} sm={12} xs={12}></Col>
                <h4 className='sub_title'>Productos</h4>
                {
                    display_data.length > 0
                        ? <Row className='mx-0'>
                                <ReactTable columns={table_columns} data={display_data} {...table_props}/>
                            </Row>
                        : this.get_loader()
                }
                <span className="m-4">
                  <Row>
                    <p>Subtotal</p>
                    <p className="ml-auto">{this.props.order.order.order_subtotal} €</p>
                  </Row>
                  <Row>
                    <p>Cargos de envio</p>
                    <p className="ml-auto">3,95 €</p>
                  </Row>
                  <Row>
                  <h4 className='sub_title'>Total general</h4>
                      <h4 className='sub_title ml-auto'>{this.props.order.order.order_total} €</h4>
                  </Row>
                </span>
            </Card>
        </div>);
    }
}

function selectStateApp(state) {
    return {app: state.app, orderList: state.orderList, order: state.order};
}

export default connect(selectStateApp, dispatch => ({
  modifyValue: (id, value) => dispatch(OrderActions.modifyValue(id, value)),
  resetState: () => dispatch(OrderActions.resetState())
}),)(Order);
