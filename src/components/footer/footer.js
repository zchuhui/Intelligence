import React from 'react';
import styles from './footer.less';

/**
 * 底部模块
 */
class Footer extends React.Component {
	render() {
		return(
			<div className={styles.footerWrap}>
				<p>
					Copyright © 2006-2017 Banggood Ltd. All Rights Reserved. <br /> 
					版权所有为广州棒谷网络科技有限公司 粤ICP备15016191号
				</p> 
			</div>
		)
	}
}


export default Footer;
