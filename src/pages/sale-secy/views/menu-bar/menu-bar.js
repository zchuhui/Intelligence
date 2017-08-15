import React from 'react';
import { Link } from 'dva/router';
import styles from './menu-bar.less';

/**
 * 销售秘书导航
 */
class MenuBar extends React.Component{

    render(){
        return(
            <div className={styles.menuBar}>
                <ul>
                    {/* <li className={styles.current}><Link to='/'>首页</Link></li> */}
                    <li><Link to='/'>首页</Link></li>
                    <li><Link to='/goods'>商品</Link></li>
                    <li>分类</li>
                    <li>品牌</li>
                </ul>
            </div>
        )
    }
}

export default MenuBar;

