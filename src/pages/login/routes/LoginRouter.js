import React from 'react';
import { connect } from 'dva';
import LoginPage from '../views/LoginPage';

class LoginRouter extends React.Component {

    constructor(props, context) {
        super(props, context);

    }

    render() {
        return (
            <div>
                <LoginPage />
            </div>
        )
    }
}


function mapStateToProps(state) {
    // 输出数据
    return {...state};
}

export default connect(mapStateToProps)(LoginRouter);
