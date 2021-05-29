import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Card,
  Badge
} from "reactstrap";
import ReactTable from 'react-table'
import {LinkContainer} from "react-router-bootstrap";
import {MdLaunch} from 'react-icons/md';
import PulseLoader from 'react-spinners/PulseLoader';
import axios from "axios";

import {base_react_table_props, order_status_list} from '../../js/vars'
import {capitalizeFirstLetter, get_badge_color} from '../../js/helper_functions'
import OrderListActions from '../../actions/OrderListActions';

const options = []
for (var i = 0; i < order_status_list.length; i++) {
  options.push({value: order_status_list[i], label: order_status_list[i]})
}

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order_list: []
    };
    this.get_state = this.get_state.bind(this);
  }
  async componentWillMount() {
    this.props.resetState();
    this.props.modifyValue('index', 0);

    //ponemos en props los pedidos con el id del usuario logeado
    const order_lists = await axios.get("https://bonsaiart.herokuapp.com/api/orders/");

    //cojo solo los del usuario
    const order_list = order_lists.data.filter((order) => {
      if (order.order_user == this.props.app.userLogged.id_user) {
        return order
      }
    })

    this.props.modifyValue('order_list', order_list);
    this.setState({order_list: order_list})
  }

  get_loader() {
    return (<Col className='my-5 text-center'>
      <PulseLoader sizeUnit={"px"} size={15} color={'#ffffff'}/>
    </Col>)
  }

  get_state(row) {
    let color = get_badge_color(row.order_state);
    return <Badge color={color}>{capitalizeFirstLetter(row.order_state)}</Badge>
  }

  render() {
    let display_data = this.state.order_list

    let table_props = {
      ...base_react_table_props,
      showPagination: display_data.length > 5,
      defaultPageSize: Math.min(display_data.length, 5),
      showPaginationBottom: display_data.length > 5
    }

    let table_columns = [
      {
        Header: 'ID del pedido',
        accessor: '_id',
        style: {
          fontWeight: "bold"
        },
        sortable: false
      }, {
        Header: 'Fecha',
        accessor: 'order_date',
        sortable: false
      }, {
        Header: 'Estado',
        id: 'state',
        accessor: (row) => this.get_state(row),
        sortable: false,
        resizable: false
      }, {
        Header: 'Importe',
        id: "importe",
        accessor: (row) => row.order_total + " €",
        sortable: false
      }, {
        Header: 'Ver detalles',
        id: 'link',
        width: 100,
        accessor: (row) => <span>
          <LinkContainer className='clickable' to={`/order/${row._id}`}>
            <MdLaunch/>
          </LinkContainer>
        </span>,
        sortable: false,
        resizable: false
      }
    ]
    return (<div className=''>
      <h3 className='mt-2 mb-0 py-4 title'>Listado de pedidos</h3>
      <Card body="body" className='py-4'>
        {
          display_data.length > 0
            ? <Row className='mx-0'>
                <ReactTable columns={table_columns} data={display_data} {...table_props}/>
              </Row>
            : <h5 className='text-center mt-2'>No hay pedidos</h5>
        }
      </Card>
    </div>);
  }
}
function selectStateApp(state) {
  return {app: state.app, orderList: state.orderList};
}

export default connect(selectStateApp, dispatch => ({
  modifyValue: (id, value) => dispatch(OrderListActions.modifyValue(id, value)),
  resetState: () => dispatch(OrderListActions.resetState())
}),)(OrderList);
