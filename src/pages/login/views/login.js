import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import styles from './login.less';
import image from './login-bg.jpg';

const FormItem = Form.Item;

class LoginPage extends React.Component {
	constructor(props, context) {
        super(props, context);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 登录
                this.props.getLoginInfo(values);
            }
        });
    }

    render() {

    	const { getFieldDecorator } = this.props.form;

        return (
            <div className={ styles.loginWrap }>
				<div className={ styles.loginForm}>
					<div className={ styles.logo }>BG</div>
					<div className={ styles.title }>请登录</div>
					<Form onSubmit={this.handleSubmit} className="login-form" style={{ margin:25,}}>
						<FormItem>
							{getFieldDecorator('username', {
								rules: [{ required: true, message: '请输入用户名' }],
							})(
								<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="账号/邮箱" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '请输入密码' }],
							})(
								<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
							)}
						</FormItem>
						<FormItem>
							<Button type="primary"  
								loading={this.props.loading} 
								htmlType="submit" 
								className="login-form-button"  
								style={{ width:300 }} 
								>
								登  录 
							</Button>
						</FormItem>
						<div className={ styles.warn}> 
						{ 
							!this.props.status?<span>{this.props.msg}</span>:<span></span>
						}
						</div>
					</Form>
				</div>
				<div className={ styles.loginImg }>
					<img  src={ image }/>
				</div>
			</div>
        )
    }
}

let WrappedLogin = Form.create()(LoginPage)

export default connect(({ LoginPage }) => ({LoginPage}))(WrappedLogin);

