import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styles from './Menu.less';

const menu = (
    <Menu>
		<Menu.Item key="0">
			<a href="/">竞品报表</a> 
		</Menu.Item>
		<Menu.Item key="1">
			<a href="/bg">BG关联报表</a>
		</Menu.Item>
		{/*<Menu.Item key="2">
			<a href="#">BG关联报表</a> 
		</Menu.Item>
		<Menu.Item key="3">
			<a href="#">BG关联报表</a>
		</Menu.Item>*/}
	</Menu>
);

class Menus extends Component {

    render() {
        return (
            <div className={ styles.menuWrap }>
				<em className={ styles.leftTip }></em>
				<Dropdown overlay={menu} >
                    <span className={ styles.menus }> 
                    <Icon className={ styles.menuIcon} type="bars" />   竞品报表 
                    </span>
                </Dropdown>
			</div>
        );
    }
}

export default Menus;
