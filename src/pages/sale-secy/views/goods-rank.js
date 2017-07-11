/**
 * 销售秘书-商品排名模块
 * Date: 2017-07-10
 * Autor:zhuangchuhui
 */

import React from 'react';
import styles from './sale-secy.less';
import { Icon } from 'antd';

class GoodsRank extends React.Component {

    render() {
        return (
            <div className={styles.panel}>
                <div className={styles.panelTitle}>
                    你的商品排名
                </div>
                <div className={styles.goodsRankWrap}>
                    <ul className={styles.clear}>
                        <li>
                            <h3>销量排行榜</h3>
                            <div>0000000</div>
                        </li>
                        <li>
                            <h3>销量排行榜</h3>
                            <div>0000000</div>
                            
                        </li>
                        <li>
                            <h3>销量排行榜</h3>
                            <div>0000000</div>
                            
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

}

export default GoodsRank;