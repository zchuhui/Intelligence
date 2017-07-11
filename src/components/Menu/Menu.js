import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styles from './menu.less';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const menu = (
    <Menu style={{ width:150,}}>
		<Menu.Item key="0">
			<a href="/">竞品报表</a> 
		</Menu.Item>
		<Menu.Item key="1">
			<a href="/bg">BG关联报表</a>
		</Menu.Item>
        <Menu.Item key="2">
			<a href="/secy">销售秘书</a>
		</Menu.Item>
	</Menu>
);


class Menus extends Component {

	state = {
		current:'竞品报表'
	}



    render() {
        return (
            <div className={ styles.menuWrap }>
				<em className={ styles.leftTip }></em>

				<Dropdown overlay={menu} >
                    <span className={ styles.menus }> 
                    	<Icon className={ styles.menuIcon} type="bars" />   
                    	{ this.props.headerMenuText } 
                    </span>
                </Dropdown>
			</div>
        );
    }

    
}

export default Menus;
