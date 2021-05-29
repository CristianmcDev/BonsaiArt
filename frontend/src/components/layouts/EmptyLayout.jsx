import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import jwt from 'jsonwebtoken';


class EmptyLayout extends Component {
    constructor(props) {
        super(props);
        this.check_logged = this.check_logged.bind(this);
      }

    check_logged(){
        if (!('loggingRequired' in this.props) || !this.props.loggingRequired){
          return true
        }
        if (!this.props.userData.logged){
          return false
        }

        const token = jwt.decode(this.props.userData.jwt)
        const now = Date.now().valueOf() / 1000
        if (typeof token.exp !== 'undefined' && token.exp < now) {
            return false
        }

        return true
    }

    render() {
        if (!this.check_logged()){
            return <Redirect to='/login'/>
        }
        else{
          return (<React.Fragment>{this.props.children}</React.Fragment>)
        }
    }
}


function selectStateApp(state) {
    return {
      userData: state.app.userLogged,
    };
}

export default connect(
    selectStateApp,
    dispatch => ({ }),
)(EmptyLayout);
