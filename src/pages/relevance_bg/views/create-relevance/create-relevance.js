/**
 * 创建关系模块
 * Date:2017-06-26
 * Author:zhuangchuhui
 */
import React from 'react';
import { connect } from 'dva';
import styles from './create-relevance.less';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import { Tabs, Button, Input, Icon, message } from 'antd';
import defaultImage from './default.png';

const TabPane = Tabs.TabPane;


class CreateRelevance extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        	// 步骤模块
            step1: 'none',
            step2: '',
            step3: 'none',

            // 进度模块
            progress1: true,
            progress2: false,
            progress3: false,

            // 所有相似的产品
            similarGoodsList:[],

            // 选中的产品
            relevanceGoodsList:[],


        }
    }

    render() {
        return (
            <MainLayout>
				<div className={styles.relevanceWrap}>
					<div className={ styles.title }>
                        <span>创建关系</span>
                    </div>

                    {/*进度条 start*/}
                    <div className={ styles.progressWrap}>
                    	<div className={styles.progressBg}>
                    		<ul>
                    			<li className={ this.state.progress1?styles.current:null }>
                    				<div className={styles.circleBg}>
                    					<div className={styles.circleText }>1</div>
                    				</div>
                    				<p className={styles.text}>第1步 <br/> 填写要关联的BG-SKU </p>
                    			</li>
                    			<li className={ this.state.progress2?styles.current:null }>
                    				<div className={styles.circleBg}>
                    					<div className={styles.circleText }>2</div>
                    				</div>
                    				<p className={styles.text}>第2步 <br/> 选择关联的外点-SKU </p>
                    			</li>
                    			<li className={ this.state.progress3?styles.current:null }>
                    				<div className={styles.circleBg}>
                    					<div className={styles.circleText }><Icon type="check" /></div>
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
                    	<div style={{ display:this.state.step1 }}>
                    		<div className={styles.stepOneWrap}>
                    			<div className={styles.imgWrap}>
                    				{
                    					this.props.goods.img_url?
                    					<img src={ this.props.goods.img_url } />:<span></span>
                    					
                    				}
                    			</div>
                    			<div className={styles.inputWrap}>
                    				<p>输入BG-SKU，<br/>根据SKU获取其主图并显示</p>
                    				<Input style={{ width:150 }}  placeholder="输入SKU" ref="inputSku"/>
                    				<Button style={{ marginLeft:5 }} onClick={this.getGoodsBySku.bind(this)}>获取</Button>
                    			</div>
                    		</div>
                    		<div style={{ textAlign:'center', height:100}}>
					    		<Button type="primary" style={{ width:100 }} onClick={this.toStepTwo.bind(this)}>下一步</Button>
					    	</div>
                    	</div>

                    	
                    	{/*步骤二*/}
                    	<div style={{ display:this.state.step2 }}> 
                    			
                    		<div className={styles.panel}>	

	                    		<div className={styles.skuToGoods}>
	                    			<div className={styles.skuImg}><img src={ this.props.goods.img_url } /></div>
	                    			<p style={{ color:'#7f8fa4',lineHeight:3}}>BG</p>
	                    			<p>SKU: {this.props.goods.sku}</p>
	                    		</div>

	                    		{/*相似的商品 start*/}
	                    		<div style={{ width:800, height:350, display:'inline-block'}}>
	                    			<Tabs defaultActiveKey="0" onChange={this.getSite.bind(this)}>
									    {
									    	this.state.similarGoodsList.map((item,index)=> 
									    		<TabPane tab={item.tname} key={index}>
									    			{
									    				item.children?
								    					<ul className={styles.similarGoods}>
								    						{
								    							item.children.map((item2,index2)=> 
								    								<li>
														    			<div className={styles.goodsShowPanel} id={item2.cid} onClick={this.selectSimilarGoods.bind(this,item2)}>
														    				<div className={styles.imgWrap}>
														    					<img src={item2.img_url} />
														    				</div>
											                    			<p>SKU: {item2.sku}</p>
														    			</div>
														    		</li>
								    							)
								    						}
									    					
									    				</ul>
									    				:<span>null</span>
									    			}
									    		</TabPane>
									    	)
									    }
									</Tabs>

									<div style={{ marginLeft:25,marginTop:20 }}>
										<Input style={{ width:150 }}  placeholder="手动添加SKU" ref="inputSku2"/>
                    					<Button style={{ marginLeft:5 }} onClick={this.getGoodsBySiteAndSku.bind(this)}>添加</Button>
									</div>
	                    		</div>
								{/*相似的商品 end*/}

								

	                    	</div>

	                    	
	                    	<div className={styles.panelBottom}>
	                    		{/*选中的商品 start*/}
	                    		<ul className={styles.similarGoods}>
	                    			{
	                    				this.state.relevanceGoodsList.map((item,index)=>
	                    					<li>
								    			<div className={styles.goodsShowPanel}>
								    				<div className={styles.imgWrap}><img src={item.img_url} /></div>
					                    			<p className={styles.brand}>{item.site}</p>
					                    			<p>SKU: {item.sku}</p>
								    			</div>
								    		</li>
	                    				)
	                    			}
						    		
						    	</ul>
						    	{/*选中的商品 end*/}

						    	<div style={{ textAlign:'center', height:100, margin:'60px auto'}}>
						    		<Button style={{ marginRight:10,width:100 }} onClick={this.toStepOne.bind(this)}>上一步</Button>
						    		<Button type="primary" style={{ width:100 }} onClick={this.toStepThree.bind(this)}>下一步</Button>
						    	</div>	
	                    	</div>
	                    	
                    	</div>

                    	
                    	{/*步骤三*/}
                    	<div style={{ display:this.state.step3 }}> 
                    		<div className={styles.panel}>
                    			<div style={{textAlign:'center',}}>
                    				<Icon type="check-circle" style={{fontSize:40, color:'#79bb51',verticalAlign:'top'}}/>
                    				<span style={{display:'inline-block',height:60, lineHeight:2.5, marginLeft:10, fontSize:16}}>已成功关联！</span>
                    			</div>
	                    	</div>
	                    	
	                    	<div className={styles.panelBottom}>
	                    		<ul className={styles.similarGoods}>
	                    			{
	                    				this.state.relevanceGoodsList.map((item,index)=>
	                    					<li>
								    			<div className={styles.goodsShowPanel}>
								    				<div className={styles.imgWrap}><img src={item.img_url} /></div>
					                    			<p className={styles.brand}>{item.site}</p>
					                    			<p>SKU: {item.sku}</p>
								    			</div>
								    		</li>
	                    				)
	                    			}
						    		
						    	</ul>
	                    	</div>
                    	</div>
                    	
                    </div>
                	{/*content end*/}
				</div>
			</MainLayout>
        )
    }

    // 获取单个商品
    getGoodsBySku() {
        // 获取Input框的sku值
        let sku = this.refs.inputSku.refs.input.value;
        if (sku !== '') {
            // 根据sku获取商品详情
            this.props.dispatch({
                type: 'RelevanceBG/fetchGoodsDetailBySku',
                payload: {
                    site: 'banggood',
                    sku: sku
                }
            })
        } else {
            message.warning("请输入商品的SKU!");
        }
    }

    // 获取单个商品,根据site and sku
    getGoodsBySiteAndSku(){
    	// 获取Input框的sku值
        let sku = this.refs.inputSku2.refs.input.value;
        let site;
        if (this.state.currentSite) {
        	site = this.state.currentSite
        }
        else{
        	site = this.state.similarGoodsList[0].tname;
        }

        if (sku !== '') {
            // 根据sku获取商品详情
            this.props.dispatch({
                type: 'RelevanceBG/fetchGoodsBySkuAndSite',
                payload: {
                    site: site,
                    sku: sku
                }
            })
        } else {
            message.warning("请输入商品的SKU!");
        }
    }

    // 选择站点
    getSite(item){
    	let site = this.state.similarGoodsList[item].tname;
    	this.setState({
    		currentSite:site
    	});
    	console.log(this.state.currentSite);
    }

    // 跳转到步骤二
    toStepTwo() {
        if (this.props.goods.admin_id) {
            this.setState({
                step1: 'none',
                step2: '',

                progress2: true
            })
        } else {
            message.warning("请选择一个商品先呀！");
        }
    }

    // 跳回到步骤一
    toStepOne() {
        this.setState({
            step1: '',
            step2: 'none',

            progress2: false
        })
    }

    // 跳转到步骤三
    toStepThree() {
        this.setState({
            step2: 'none',
            step3: '',

            progress2: true,
            progress3: true
        })
    }

    // 选择相似产品
    selectSimilarGoods(item) {

    	let arr = this.state.relevanceGoodsList;
    	arr.push(item);

    	this.setState({
    		relevanceGoodsList:arr
    	})

        console.log(this.state.relevanceGoodsList);
    }




    componentDidMount() {
    	this.setState({
    		similarGoodsList:this.props.similarGoodsList,
    	})
    }

}



function mapStateToProps(state) {

    const similarGoodsList = [{
        tname: 'banggood',
        tkey: 0,
        children: [{
            cid: 1,
            img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
            sku: '56545465',
            site: '大卖通',
        }, {
            cid: 1,
            img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
            sku: '56545465',
            site: '大卖通',
        }, {
            cid: 1,
            img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
            sku: '56545465',
            site: '大卖通',
        }, {
            cid: 1,
            img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
            sku: '56545465',
            site: '大卖通',
        }, {
            cid: 1,
            img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
            sku: '56545465',
            site: '大卖通',
        }]
    }, {
        tname: 'gearbest',
        tkey: 1,
        children: [{
            cid: 1,
            img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
            sku: '56545465',
            site: '大卖通',
        }, {
            cid: 2,
            img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
            sku: '56545465',
            site: '大卖通',
        }, {
            cid: 3,
            img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
            sku: '56545465',
            site: '大卖通',
        }, {
            cid: 4,
            img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
            sku: '56545465',
            site: '大卖通',
        }, {
            cid: 5,
            img_url: 'https://gloimg.gearbest.com/gb/2015/201510/goods-img/1444603895045-P-3203361.jpg',
            sku: '56545465',
            site: '大卖通',
        }]
    }, ];

    const { goods } = state.RelevanceBG;

    return {
        goods: goods,
        similarGoodsList: similarGoodsList
    }
}

export default connect(mapStateToProps)(CreateRelevance);
