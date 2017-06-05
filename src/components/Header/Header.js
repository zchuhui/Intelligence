import React, { Component }  from 'react';
import {  Menu, Dropdown, Icon } from 'antd';
import styles from './Header.less';
import Logo from './logo.png';


// 用户设置
const setup = (
  <Menu>
    <Menu.Item key="0">
      <a href="javascript:;">设置</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="javascript:;">退出</a>
    </Menu.Item>
  </Menu> 
)

// 用户消息
const messages = (
  <Menu>
    <Menu.Item key="0">
      <a href="javascript:;">消息1......</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="javascript:;">消息2......</a>
    </Menu.Item>
  </Menu>
)


// 公共头部
class Header extends Component{
    
    render() {
        return (
            <div className={ styles.header }>
                <div className={ styles.content }>
                    <img className={ styles.logo } src={ Logo } title="情报员系统"/>
                    
                    <div className={styles.msgWrap }>
                        <div className={ styles.msgItem }>
                            <Dropdown overlay={messages}>
                                <span className={ styles.pointer }> 
                                  消息中心 
                                </span>
                            </Dropdown>
                            <em className={ styles.msgCircle }></em>
                        </div>
                        <div className={ styles.msgLine }></div>
                        <div className={ styles.msgItem }>
                            <Dropdown overlay={setup} trigger={['click']}>
                                <span className={ styles.pointer } >
                                  小马哥 <Icon type="down" />
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

