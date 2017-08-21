import React from 'react';
import { connect } from 'dva';
import { Menu, Dropdown, Icon } from 'antd';
import styles from './header.less';
import Logo from './logo.png';


/**
 * 头部模块
 */
class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        // 菜单
        const menu = (
			<Menu style={{ width:150,}}>
				<Menu.Item key="0">
					<a href="/">竞品报表</a> 
				</Menu.Item>
                <Menu.Item key="2">
                    <a href="/sale-secy">销售秘书</a>
                </Menu.Item>
				{/* <Menu.Item key="1">
					<a href="/bg">BG关联报表</a>
				</Menu.Item> */}
				{/* {
					// 如果有权限，则显示销售秘书
					this.props.userPermission?
					<Menu.Item key="2">
						<a href="/sale-secy">销售秘书</a>
					</Menu.Item>
					:null
				} */}
				
			</Menu>
        );
        
        return (
            <div className={ styles.header }>
                <div className={ styles.content }>
                    
                    {/*logo start*/}
                    <img className={ styles.logo } src={ Logo } title="情报员系统" />
                    {/*logo end*/}

                    {/*菜单 start*/}
                    <div className={ styles.menuWrap }>
                        <em className={ styles.leftTip }></em>
                        <Dropdown overlay={menu} >
                            <span className={ styles.menus }> 
                                <Icon className={ styles.menuIcon} type="bars" />   
                                { this.props.headerMenuText } 
                            </span>
                        </Dropdown>
                    </div>
                    {/*菜单 end*/}

                    {/*用户信息 start*/}
                    <div className={styles.msgWrap }>
                        {
                            /*<div className={ styles.msgItem }>
                                <Dropdown overlay={this.messages}>
                                    <span className={ styles.pointer }> 
                                    <Icon className={ styles.emil} type="mail" />消息中心 
                                    </span>
                                </Dropdown>
                                <span className={ styles.msgCircle }>55</span>
                            </div>*/
                        }
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
                    {/*用户信息 end*/}
                </div>
            </div>
        );
    }

    /**
     * 退出登录
     */
    logout() {
        this.props.dispatch({
            type: 'User/logout',
        });
    }

    /**
     * 用户设置
     */
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
}


function mapStateToProps(state) {
    return {...state.User};
}

export default connect(mapStateToProps)(Header);
