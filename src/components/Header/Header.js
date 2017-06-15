import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styles from './Header.less';
import Logo from './logo.png';
import Menus from '../../components/Menu/Menu';


// 用户设置
const setup = (
    <Menu>
    <Menu.Item key="0">
      <a href="javascript:;">开发中...</a>
    </Menu.Item>
    {/*<Menu.Item key="1">
      <a href="javascript:;">退出</a>
    </Menu.Item>*/}
  </Menu>
)

// 用户消息
const messages = (
    <Menu>
    <Menu.Item key="0">
      <a href="javascript:;">开发中...</a>
    </Menu.Item>
  </Menu>
)


// 公共头部
class Header extends Component {

    render() {
        return (
            <div className={ styles.header }>
                <div className={ styles.content }>
                    <img className={ styles.logo } src={ Logo } title="情报员系统"/>
                    {/*菜单组件*/}
                    <Menus />

                    <div className={styles.msgWrap }>
                        <div className={ styles.msgItem }>
                            <Dropdown overlay={messages}>
                                <span className={ styles.pointer }> 
                                  <Icon className={ styles.emil} type="mail" />消息中心 
                                </span>
                            </Dropdown>
                            <span className={ styles.msgCircle }>55</span>
                        </div>
                        <div className={ styles.msgItem }>
                            <Dropdown overlay={setup}>
                                <span className={ styles.pointer } >
                                  <img className={ styles.head } src={Logo}/> <Icon type="down" /> 
                                </span>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
