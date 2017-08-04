import React from 'react';
import { connect } from 'dva';
import { Menu, Dropdown, Icon } from 'antd';
import styles from './header.less';
import Logo from './logo.png';
import Menus from '../../components/menu/menu';


// 公共头部
class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    /**
     * 退出登录
     */
    logout() {
        console.log('logout')
        this.props.dispatch({
            type: 'User/logout',
        });
    }

    // 用户设置
    setups = (
        <Menu>
        <Menu.Item key="0">
            <a href="javascript:;" onClick={this.logout.bind(this)}>退出</a>
        </Menu.Item>
      </Menu>
    )
    
    // 用户消息
    /*messages = (
        <Menu>
        <Menu.Item key="0">
          <a href="javascript:;">开发中...</a>
        </Menu.Item>
      </Menu>
    )*/


    render() {
        return (
            <div className={ styles.header }>
                <div className={ styles.content }>
                    <img className={ styles.logo } src={ Logo } title="情报员系统" />
                    {/*菜单组件*/}
                    <Menus headerMenuText={this.props.headerMenuText} />

                    <div className={styles.msgWrap }>
                        {/*<div className={ styles.msgItem }>
                            <Dropdown overlay={this.messages}>
                                <span className={ styles.pointer }> 
                                  <Icon className={ styles.emil} type="mail" />消息中心 
                                </span>
                            </Dropdown>
                            <span className={ styles.msgCircle }>55</span>
                        </div>*/}
                        <div className={ styles.msgItem }>
                            {   
                                /*判断是否已经登录*/
                                this.props.loginStatus?
                                <Dropdown overlay={this.setups}>
                                    <span className={ styles.pointer } >
                                        <span>{this.props.userInfo.admin_name}</span>
                                    </span>
                                </Dropdown>
                                :
                                <a href="/login" className={ styles.pointer } >登录</a>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


function mapStateToProps(state) {
    return {...state.User};
}

export default connect(mapStateToProps)(Header);
