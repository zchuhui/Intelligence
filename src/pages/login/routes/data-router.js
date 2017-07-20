import React from 'react';
import { connect } from 'dva';
import LoginPage from '../views/login';
import Header from '../../../components/header/header';



class LoginRouter extends React.Component {

    constructor(props, context) {
        super(props, context);

    }

    getLoginInfo(info) {
        this.props.dispatch({
            type: 'User/login',
            payload: {
                loginInfo: info
            }
        })
    }

    render() {
        return (
            <div>
                {/* <Header 
                    status={this.props.status} 
                    userInfo={this.props.userInfo} 
                /> */}
                <LoginPage 
                    getLoginInfo={info => this.getLoginInfo(info)} 
                    msg={this.props.msg}
                    status={this.props.status}
                    loading={this.props.loading}
                />
            </div>
        )
    }
}


function mapStateToProps(state) {
    let msg = state.User.loginMsg;
    let userInfo = state.User.userInfo;
    let status = state.User.loginStatus;
    let loading = state.User.loading;

    return {
        msg: msg,
        status: status,
        loading: loading,
        userInfo: userInfo,
    };
}

export default connect(mapStateToProps)(LoginRouter);
