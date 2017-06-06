import React from 'react';
import { connect } from 'dva';

class Login extends React.Component {

	render(){
		return (
			<div>
				登录
			</div>
		)
	}
}

Login.propTypes = {}

export default connect()(Login);

