import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Card,
  Input,
  Badge,
  CustomInput,
  Button
} from "reactstrap";
import ReactTable from 'react-table'
import {LinkContainer} from "react-router-bootstrap";
import {base_react_table_props, order_status_list} from '../../js/vars'
import {capitalizeFirstLetter, get_badge_color} from '../../js/helper_functions'
import {MdVisibility, MdVisibilityOff, MdDelete, MdLaunch} from 'react-icons/md';
import axios from "axios";

import NotificationActions from '../../actions/NotificationActions';
import PulseLoader from 'react-spinners/PulseLoader';

const options = []
for (var i = 0; i < order_status_list.length; i++) {
  options.push({value: order_status_list[i], label: order_status_list[i]})
}

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order_list: {}
    };
    this.get_state = this.get_state.bind(this);
    this.modify_searchbox = this.modify_searchbox.bind(this);
    this.filter_text = this.filter_text.bind(this);
    this.modify_checkbox = this.modify_checkbox.bind(this);
    this.modify_state = this.modify_state.bind(this);
    this.getTrProps = this.getTrProps.bind(this);
    this.modify_seen = this.modify_seen.bind(this);
    this.delete_notification = this.delete_notification.bind(this);
    this.get_checked_list = this.get_checked_list.bind(this);
    this.filter_seen = this.filter_seen.bind(this);
    this.change_untried = this.change_untried.bind(this);
  }

  async componentDidMount() {
    //cogemos bd de notificationes y la guardamos
    const order_list = await axios.get("https://bonsaiart.herokuapp.com/api/notifications/");

    this.setState({order_list: order_list});

    this.props.modifyValue('notification_list', order_list.data);
    //calculos los nº de notification
    let num = order_list.data.length;

    this.props.modifyValue("notification_num", num)
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

  modify_checkbox(event) {
    let new_checkboxes = {};
    if (event.target.id === "select_all") {
      new_checkboxes.select_all = event.target.checked;
      for (var i = 0; i < this.props.notification.notification_list.length; i++) {
        new_checkboxes[this.props.notification.notification_list[i]._id] = event.target.checked;
      }
    } else {
      new_checkboxes = Object.assign({}, this.props.notification.checkboxes, {
        [event.target.id]: event.target.checked
      })
    }
    this.props.modifyValue('checkboxes', new_checkboxes);
  }

  modify_searchbox(event) {
    this.setState({search: event.target.value})

  }

  modify_state(event) {
    this.setState({options: event.value})
  }

  get_checked_list() {
    let checked_list = this.props.notification.checkboxes;
    checked_list = Object.keys(checked_list).filter(c => checked_list[c])
    return checked_list;
  }

  async delete_notification() {
    let checked_list = this.get_checked_list();
    let ids=[];
    let new_noti = this.props.notification.notification_list.filter( n =>{ if(checked_list.indexOf(String(n._id)) === -1){
      return n
    }else{
      ids.push(n._id);
      }
    })

    for(let i = 0; i< ids.length; i++){
      await axios.delete("https://bonsaiart.herokuapp.com/api/notifications/"+ids[i])
    }

    this.props.modifyValue('notification_list', new_noti);
  }

  filter_text(value) {
    if (!value) {
      return [];
    }
    let res = [];
    if (this.state.search) {
      res = value.filter((notification) => notification._id == this.state.search)
    }

    if (res.length === 0) {
      return value
    }
    return res;
  }

  getTrProps(state, rowinfo, instance) {
    if (rowinfo) {
      let style;
      if (rowinfo.original.order_seen) {
        style = {
          background: '#f3f3f3',
          fontWeight: '500'
        }
      } else {
        style = {
          background: 'white',
          fontWeight: '700'
        }
      }
      return {style};
    }
    return {};
  }

  filter_seen(seen) {
    let checked_list = this.get_checked_list();
    checked_list.map((checked) => this.modify_seen(checked, seen))
  }

  change_untried() {
    this.filter_seen(false)
  }

  async modify_seen(event, seen) {
    //aqui si no llega el false, se crea un objeto raro, por eso el if
    if(seen != false){
      seen= true
    }
    let new_data = this.props.notification.notification_list.slice();
    let target;
    let ids=[];
    if (typeof(event) === "string") {
      target = event;
    } else {
      target = event.target.id;
    }

    new_data.map((r) => {
      if (String(r._id) === target) {
        r.order_seen = seen
        ids.push(r._id);
      }
      return r;
    })

    for(let i = 0; i< ids.length; i++){
      let data;
      for(let t = 0 ; t<new_data.length; t++){
        if(new_data[t]._id == ids[i]){
          data = new_data[t]
        }
      }
      await axios.put("https://bonsaiart.herokuapp.com/api/notifications/"+ids[i], data)
    }
    this.props.modifyValue('notification_list', new_data)

  }

  render() {
    let display_data = this.filter_text(this.props.notification.notification_list)

    let table_props = {
      ...base_react_table_props,
      showPagination: display_data.length > 5,
      defaultPageSize: Math.min(display_data.length, 5),
      showPaginationBottom: display_data.length > 5,
      getTrProps: this.getTrProps
    }

    let table_columns = [
      {
        Header: (row) => <Row className='mx-0 align-items-center'>
          <CustomInput type="checkbox" id="select_all" label="" onChange={this.modify_checkbox} checked={this.props.notification.checkboxes.select_all}/>
          <Button color='' className='p-0 ml-2 btn-seen' id='btn-seen' disabled={false} onClick={this.filter_seen}>
            <MdVisibility className=''/>
          </Button>
          <Button color='' className='p-0 ml-2' id='btn-notseen' disabled={false} onClick={this.change_untried}>
            <MdVisibilityOff className=''/>
          </Button>
          <Button color='' className='p-0 ml-2' id='btn-del' disabled={false} onClick={this.delete_notification}>
            <MdDelete className=''/>
          </Button>
        </Row>,
        id: 'checkbox',
        accessor: (row) => <CustomInput className="pl-4" type="checkbox" id={row._id} onChange={this.modify_checkbox} checked={this.props.notification.checkboxes[row._id]} label=""/>,
        width: 120,
        sortable: false,
        resizable: false,
        style: {
          textAlign: "right"
        },
        className: 'table-contract-list-checkbox'
      }, {
        Header: 'ID del pedido',
        accessor: '_id',
        resizable: false,
        sortable: false
      }, {
        Header: 'Fecha',
        accessor: 'order_date',
        sortable: false
      }, {
        Header: 'Estado',
        id: 'state',
        accessor: (row) => this.get_state(row),
        resizable: false,
        sortable: false
      }, {
        Header: 'Importe',
        id: "importe",
        accessor: (row) => row.order_total + " €",
        resizable: false,
        sortable: false
      }, {
        Header: 'Ver detalles',
        id: 'link',
        accessor: (row) => <LinkContainer className='clickable btn-seen' onClick={this.modify_seen} id={row._id} to={`/admin/order/${row._id}`}>
          <MdLaunch id={row._id}/>
        </LinkContainer>,
        resizable: false,
        sortable: false
      }
    ]

    return (<div className=''>
      <h3 className='mt-2 mb-0 py-4 title'>Listado de notificaciones</h3>
      <Card body="body" className='py-4'>
        <Col className='px-0 mr-auto mb-2' xl={12} lg={12} md={12} sm={12} xs={12}>
          <Row className='mx-0'>
            <Col className='px-0' xl={6} lg={6} md={7} sm={12} xs={12}>
              <Row className='mx-0'>
                <Col className='pl-0 mb-2' xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input className='w-100' placeholder='Filtrar texto...' onChange={this.modify_searchbox}/>
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
            : <h5 className='text-center mt-2'>No hay notificaciones</h5>
        }

      </Card>
    </div>);
  }
}
function selectStateApp(state) {
  return {app: state.app, notification: state.notification, orderList: state.orderList};
}

export default connect(selectStateApp, dispatch => ({
  modifyValue: (id, value) => dispatch(NotificationActions.modifyValue(id, value)),
  resetState: () => dispatch(NotificationActions.resetState())
}),)(Notification);
