import React from 'react';
import { Link } from 'dva/router';
import styles from './menu-bar.less';

/**
 * 销售秘书导航
 * detai: 根据回传的值，判断选中哪个
 */
class MenuBar extends React.Component{

    render(){
        return(
            <div className={styles.menuBar}>
                <ul>
                    <li className={this.props.value==0?styles.current:null} ><Link to='/'>首页</Link></li>
                    <li className={this.props.value==1?styles.current:null} ><Link to='/goods'>商品</Link></li>
                    <li>分类</li>
                    <li>品牌</li>
                </ul>
            </div>
        )
    }
}

export default MenuBar;

