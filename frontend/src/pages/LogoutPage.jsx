import React, { Component } from 'react';
import AppActions from '../actions/AppActions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        //i18n.changeLanguage('es-ES');
      }

    componentWillMount() {
        this.props.setUserLogout();
        Swal.fire(
          'Éxito!',
          'Hasta pronto',
          'success'
        )
        this.props.history.push('/login');
    }


    render() {
        return(
            <div>
            Adios!
            </div>
        );
    }
}

function selectStateApp(state) {
    return { appState: state.app };
  }

export default connect(
    selectStateApp,
    dispatch => ({
        setUserLogout: () => dispatch(AppActions.setUserLogout()),
    })
)(Logout);
