import React from 'react';
import styles from './footer.less';

/**
 * 底部模块
 */
class Footer extends React.Component {
	render() {
		return(
			<div className={styles.footerWrap}>
				<p>Copyright 2017 RongCloud京公网安备 11010502027139京ICP备15042119号-1</p> 
			</div>
		)
	}
}


export default Footer;
