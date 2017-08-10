import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styles from './menu.less';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class Menus extends Component {
	state = {
		current:'竞品报表'
	}

    render() {

		const menu = (
			<Menu style={{ width:150,}}>
				<Menu.Item key="0">
					<a href="/">竞品报表</a> 
				</Menu.Item>
				<Menu.Item key="1">
					<a href="/bg">BG关联报表</a>
				</Menu.Item>
				{
					// 如果有权限，则显示销售秘书
					this.props.userPermission?
					<Menu.Item key="2">
						<a href="/sale-secy">销售秘书</a>
					</Menu.Item>
					:null
				}
				
			</Menu>
		);

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
	
	componentDidUpdate(){
	}
}

export default Menus;
