/**
 * 创建关系模块
 * Date:2017-06-26
 * Author:zhuangchuhui
 */
import React from 'react';
import styles from './create-relevance.less';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import { Tabs, Button, Input, Icon } from 'antd';

const TabPane = Tabs.TabPane;


class CreateRelevance extends React.Component {

    render() {
        return (
            <MainLayout>
				<div className={styles.relevanceWrap}>
					<div className={ styles.title }>
                        <span>创建关系</span>
                    </div>

                    {/*进度条 start*/}
                    <div className={styles.progressWrap}>
                    	<div className={styles.progressBg}>
                    		<ul>
                    			<li className={styles.current}>
                    				<div className={styles.circleBg}>
                    					<div className={styles.circleText }>1</div>
                    				</div>
                    				<p className={styles.text}>第1步 <br/> 填写要关联的BG-SKU </p>
                    			</li>
                    			<li>
                    				<div className={styles.circleBg}>
                    					<div className={styles.circleText }>2</div>
                    				</div>
                    				<p className={styles.text}>第2步 <br/> 选择关联的外点-SKU </p>
                    			</li>
                    			<li>
                    				<div className={styles.circleBg}>
                    					<div className={styles.circleText }>3</div>
                    				</div>
                    				<p className={styles.text}>第3步 <br/> 确认完成关联 </p>
                    			</li>
                    		</ul>
                    	</div>
                    </div>
                    {/*进度条 end*/}

                    {/*content start*/}
                    <div className={styles.content}>

                    	{/*步骤一*/}
                    	<div style={{ display:'none' }}>
                    		<div className={styles.stepOneWrap}>
                    			<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/pdm-product-pic/Electronic/2017/06/16/goods-img/1497575170241353815.jpg' /></div>
                    			<div className={styles.inputWrap}>
                    				<p>输入BG-SKU，<br/>根据SKU获取其主图并显示</p>
                    				<Input placeholder="输入SKU" />
                    			</div>
                    		</div>
                    		<div style={{ textAlign:'center', height:100}}>
					    		<Button type="primary" style={{ width:100 }}>下一步</Button>
					    	</div>
                    	</div>
                    	
                    	{/*步骤二*/}
                    	<div style={{  }}> 
                    		<div className={styles.panel}>
	                    		<div className={styles.skuToGoods}>
	                    			<div className={styles.skuImg}><img src='https://gloimg.gearbest.com/gb/2015/201509/goods-img/1498122465127285912.jpg' /></div>
	                    			<p style={{ color:'#7f8fa4',lineHeight:3}}>BG</p>
	                    			<p>SKU:5525474</p>
	                    		</div>
	                    		<Tabs defaultActiveKey="1" style={{ width:800,display:'inline-block'}}>
								    <TabPane tab="环球" key="1">
								    	<ul className={styles.similarGoods}>
								    		<li>
								    			<div className={styles.goodsShowPanel}>
								    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
					                    			<p>SKU:5525474</p>
								    			</div>
								    		</li>
								    		<li>
								    			<div className={styles.goodsShowPanel}>
								    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
					                    			<p>SKU:5525474</p>
								    			</div>
								    		</li>
								    		<li>
								    			<div className={styles.goodsShowPanel}>
								    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
					                    			<p>SKU:5525474</p>
								    			</div>
								    		</li>
								    		<li>
								    			<div className={styles.goodsShowPanel}>
								    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
					                    			<p>SKU:5525474</p>
								    			</div>
								    		</li>
								    		<li>
								    			<div className={styles.goodsShowPanel}>
								    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
					                    			<p>SKU:5525474</p>
								    			</div>
								    		</li>
								    	</ul>
								    </TabPane>
								    <TabPane tab="DX" key="2">Content of Tab Pane 2</TabPane>
								    <TabPane tab="速卖通" key="3">Content of Tab Pane 3</TabPane>
								    <TabPane tab="TomTop" key="4">TomTop</TabPane>
								    <TabPane tab="XX" key="5">XX</TabPane>
								    <TabPane tab="XXXX" key="6">XXXXX</TabPane>
								</Tabs>

	                    	</div>

	                    	<div className={styles.panelBottom}>
	                    		<ul className={styles.similarGoods}>
						    		<li>
						    			<div className={styles.goodsShowPanel}>
						    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
			                    			<p className={styles.brand}>环球</p>
			                    			<p>SKU:5525474</p>
						    			</div>
						    		</li>
						    		<li>
						    			<div className={styles.goodsShowPanel}>
						    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
			                    			<p className={styles.brand}>环球</p>
			                    			<p>SKU:5525474</p>
						    			</div>
						    		</li>
						    		<li>
						    			<div className={styles.goodsShowPanel}>
						    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
			                    			<p className={styles.brand}>环球</p>
			                    			<p>SKU:5525474</p>
						    			</div>
						    		</li>
						    		<li>
						    			<div className={styles.goodsShowPanel}>
						    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
			                    			<p className={styles.brand}>环球</p>
			                    			<p>SKU:5525474</p>
						    			</div>
						    		</li>
						    		<li>
						    			<div className={styles.goodsShowPanel}>
						    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
			                    			<p className={styles.brand}>环球</p>
			                    			<p>SKU:5525474</p>
						    			</div>
						    		</li>
						    	</ul>
						    	<div style={{ textAlign:'center', height:100, margin:'60px auto'}}>
						    		<Button style={{ marginRight:10,width:100 }}>上一步</Button>
						    		<Button type="primary" style={{ width:100 }}>下一步</Button>
						    	</div>
						    	
	                    	</div>
                    	</div>
                    	
                    	{/*步骤三*/}
                    	<div style={{ display:'none' }}> 
                    		<div className={styles.panel}>
                    			<div style={{textAlign:'center',}}>
                    				<Icon type="check-circle" style={{fontSize:40, color:'#79bb51',verticalAlign:'top'}}/>
                    				<span style={{display:'inline-block',height:60, lineHeight:2.5, marginLeft:10, fontSize:16}}>已成功关联！</span>
                    			</div>
	                    	</div>
	                    	
	                    	<div className={styles.panelBottom}>
	                    		<ul className={styles.similarGoods}>
						    		<li>
						    			<div className={styles.goodsShowPanel}>
						    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
			                    			<p className={styles.brand}>环球</p>
			                    			<p>SKU:5525474</p>
						    			</div>
						    		</li>
						    		<li>
						    			<div className={styles.goodsShowPanel}>
						    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
			                    			<p className={styles.brand}>环球</p>
			                    			<p>SKU:5525474</p>
						    			</div>
						    		</li>
						    		<li>
						    			<div className={styles.goodsShowPanel}>
						    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
			                    			<p className={styles.brand}>环球</p>
			                    			<p>SKU:5525474</p>
						    			</div>
						    		</li>
						    		<li>
						    			<div className={styles.goodsShowPanel}>
						    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
			                    			<p className={styles.brand}>环球</p>
			                    			<p>SKU:5525474</p>
						    			</div>
						    		</li>
						    		<li>
						    			<div className={styles.goodsShowPanel}>
						    				<div className={styles.imgWrap}><img src='https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg' /></div>
			                    			<p className={styles.brand}>环球</p>
			                    			<p>SKU:5525474</p>
						    			</div>
						    		</li>
						    	</ul>
	                    	</div>
                    	</div>
                    	
                    </div>
                	{/*content end*/}
				</div>
			</MainLayout>
        )
    }
}


export default CreateRelevance;
