import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styles from './Menu.less';

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
		{/*<MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup>*/}
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
