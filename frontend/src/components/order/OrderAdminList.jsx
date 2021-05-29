import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Row,
    Col,
    Card,
    Input,
    Badge
} from "reactstrap";
import Select from 'react-select';
import ReactTable from 'react-table'
import {LinkContainer} from "react-router-bootstrap";
import {base_react_table_props, order_status_list} from '../../js/vars'
import {capitalizeFirstLetter, get_badge_color} from '../../js/helper_functions'
import OrderListActions from '../../actions/OrderListActions';
import {MdLaunch, MdEdit} from 'react-icons/md';
import PulseLoader from 'react-spinners/PulseLoader';
import StateModal from './Modal/StateModal';
import axios from "axios";


const options = []
for (var i = 0; i < order_status_list.length; i++) {
    options.push({value: order_status_list[i], label: order_status_list[i]})
}

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.get_state = this.get_state.bind(this);
        this.modify_searchbox = this.modify_searchbox.bind(this);
        this.filter_text = this.filter_text.bind(this);
        this.modify_state = this.modify_state.bind(this);
        this.filter_state = this.filter_state.bind(this);
        this.switchModalVisibility = this.switchModalVisibility.bind(this);
    }
    async componentWillMount() {
      this.props.resetState();
      //ponemos en props los pedidos con el id del usuario logeado
      const order_lists = await axios.get("https://bonsaiart.herokuapp.com/api/orders/");

      this.props.modifyValue('order_list', order_lists.data);
    }

    switchModalVisibility(id, index) {
        this.props.modifyValue('index', index)
        this.props.modifyModal(
            id, id in this.props.orderList
            ? !this.props.orderList[id]
            : true)
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

    modify_searchbox(event) {
        this.setState({search: event.target.value})

    }

    modify_state(event) {
        this.setState({options: event.value})
    }

    filter_text(value) {
        if (!value) {
            return [];
        }
        let res = [];
        if (this.state.search) {
            res = value.filter((order) =>  order._id == this.state.search)
        }

        if (res.length === 0) {
            return value
        }

        return res;
    }

    filter_state(value) {
        console.log(this.state.options)
        if (this.state.options) {
            if (this.state.options === 'Cualquier estado') {
                return value
            } else {
                return value.filter((order) => order.order_state.toLowerCase() === this.state.options.toLowerCase())
            }
        } else {
            return value
        }
    }

    render() {
        let display_data = this.filter_state(this.filter_text(this.props.orderList.order_list))

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
                sortable: false,
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
                sortable: false,
                resizable: false
            }, {
                Header: 'Ver detalles',
                id: 'link',
                width: 100,
                accessor: (row) => <span>
                    <LinkContainer className='clickable' to={`/admin/order/${row._id}`}>
                        <MdLaunch/>
                    </LinkContainer>
                    <MdEdit className='clickable ml-2' onClick={() => this.switchModalVisibility('StateModalOpen', this.props.orderList.order_list.indexOf(row))}/>
                </span>,
                sortable: false,
                resizable: false
            }
        ]
        return (<div className=''>
            <StateModal/>
            <h3 className='mt-2 mb-0 py-4 title'>Listado de pedidos</h3>
            <Card body="body" className='py-4'>
                <Col className='px-0 mr-auto mb-2' xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Row className='mx-0'>
                        <Col className='px-0' xl={6} lg={6} md={7} sm={12} xs={12}>
                            <Row className='mx-0'>
                                <Col className='pl-0 mb-2' xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <Input className='w-100' placeholder='Filtrar texto...' onChange={this.modify_searchbox}/>
                                </Col>
                                <Col className='pl-0 mb-2' xl={6} lg={6} md={6} sm={12} xs={12}>
                                    <Select placeholder="Filtrar estado..." className='w-100 select-imput basic-single' onChange={this.modify_state} options={options} classNamePrefix="select" isSearchable={true} name="color"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
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
    modifyModal: (index, id, value) => dispatch(OrderListActions.modifyModal(index, id, value)),
    resetState: () => dispatch(OrderListActions.resetState())
}),)(OrderList);
