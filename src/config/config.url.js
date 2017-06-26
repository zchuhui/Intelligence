/**
 * 根据路由判断是环境
 * Date: 2017/6/19
 * Author: zhuangchuhui
 */

let url;

if (document.domain === 'betabia.banggood.com') {
	// 测试环境
	url = 'https://betabia.banggood.com/index.php';
}
else{
	// 本地
	url = '/api';
}

export default {
	Url: url
}