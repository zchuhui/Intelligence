/**
 * 创建关系模块
 * Date:2017-06-26
 * Author:zhuangchuhui
 */
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './create-relevance.less';
import MainLayout from '../../../../components/layout-main/layout-main';
import { Tabs, Button, Input, Icon, message, Alert, Spin } from 'antd';
import defaultImage from './default.png';

const TabPane = Tabs.TabPane;


class CreateRelevance extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title:'创建关系',

        	// 步骤模块
            step1: '',
            step2: 'none',
            step3: 'none',

            // 进度模块
            progress1: true,
            progress2: false,
            progress3: false,

            // 所有相似的产品
            similarGoodsList:[],
            siteKey:0,

            // 选中的产品
            relevanceGoodsList:[],

        }
    }

    render() {
        return (
            <MainLayout headerMenuText="BG关联报表">
                <Spin spinning={this.props.createRelevanceLoading}>
    				<div className={styles.relevanceWrap}>

    					<div className={ styles.title }>
                            <span>{ this.state.title }</span>
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
                                            this.props.goods.data?
                                            <img src={ this.props.goods.data.img_url } />
                                            :<span></span>
                                        }
                        			</div>
                        			<div className={styles.inputWrap}>
                        				<p>输入BG-SKU，<br/>根据SKU获取其主图并显示</p>
                        				<Input style={{ width:150 }}  placeholder="输入SKU" ref="inputSku"/>
                        				<Button style={{ marginLeft:5 }} onClick={this.getGoodsBySku.bind(this,null)}>获取</Button>
                                        <div style={{ height:50}}>
                                            {
                                                this.props.goods.msg?
                                                <p style={{color:'red'}}>{this.props.goods.msg}</p>
                                                :<p></p>
                                            }
                                        </div>
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
    	                    			<div className={styles.skuImg}>
                                            {
                                                this.props.goods.data?
                                                <img src={ this.props.goods.data.img_url } />
                                                :<span></span>
                                            }
                                        </div>
    	                    			<p style={{ color:'#7f8fa4',lineHeight:3}}>BG</p>
                                        {
                                            this.props.goods.data?
                                            <p>SKU: {this.props.goods.data.sku}</p>
                                            :<p></p>
                                        }
    	                    			
    	                    		</div>

    	                    		{/*相似的商品 start*/}
    	                    		<div style={{ width:800, height:350, display:'inline-block'}}>
    	                    			<Tabs defaultActiveKey='0' onChange={this.getSite.bind(this)}>
    									    {
                                                this.state.similarGoodsList?
                                                this.state.similarGoodsList.map((item,index)=> 
                                                    <TabPane tab={item.tname} key={index}>
                                                        {
                                                            item.children?
                                                            <ul className={styles.similarGoods}>
                                                                {
                                                                    item.children.map((item2,index2)=> 
                                                                        <li>

                                                                            <div className={ item2.select?styles.goodsShowPanelCurrent:styles.goodsShowPanel } 
                                                                                id={item2.cid} onClick={this.selectSimilarGoods.bind(this,index2,item2)}>
                                                                                <div className={styles.imgWrap}>
                                                                                    <img src={item2.img_url} />
                                                                                </div>
                                                                                <p>SKU: {item2.sku}</p>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                }
                                                                
                                                            </ul> 
                                                            :<p>该站点没有相似的商品，可以选择手动输入</p>
                                                        }
                                                    </TabPane>
                                                )
                                                :<span>.</span>
                                            }
    									</Tabs>

                                        {/*手动输入商品*/}
    									<div style={{ marginLeft:25,marginTop:20 }}>
    										<Input style={{ width:150 }}  placeholder="手动添加SKU" ref="inputSku2"/>
                                            <Button style={{ marginLeft:5 }} onClick={this.getGoodsBySiteAndSku.bind(this)}>搜索</Button>
                        					{
                                                this.props.goodsBySite.code==200?
                                                <Button style={{ marginLeft:5 }} onClick={this.selectGoodsBySite.bind(this)}>选中该商品</Button>
                                                : null
                                                
                                            }
                                            
                                            <span style={{ marginLeft:10,color:'red' }}>
                                                {
                                                    this.props.goodsBySite.code==200?
                                                    <span>{this.props.goodsBySite.msg}</span>
                                                    :<span>{this.props.goodsBySite.msg}</span>
                                                }
                                            </span>
    									</div>

    	                    		</div>
    								{/*相似的商品 end*/}

    	                    	</div>
    	                    	
    	                    	<div className={styles.panelBottom}>
    	                    		{/*选中的商品 start*/}
    	                    		<ul className={styles.similarGoods}>
    	                    			{
    	                    				this.state.relevanceGoodsList.map((item,index)=>
    	                    					<li className={styles.deleteSelectGoods}>
    								    			<div className={styles.goodsShowPanel} onClick={this.cancelRelevanceGoods.bind(this,index,item)}>
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
                                        {
                                            /*如果是编辑关系，则不显示上一步*/
                                            !this.props.params.sku?
                                            <Button style={{ marginRight:10,width:100 }} onClick={this.toStepOne.bind(this)}>上一步</Button>
                                            :null
                                        }
    						    		
    						    		<Button type="primary" style={{ width:100 }} onClick={this.toStepThree.bind(this)}>开始关联</Button>
    						    	</div>	
    	                    	</div>
    	                    	
                        	</div>

                        	
                        	{/*步骤三*/}
                        	<div style={{ display:this.state.step3 }}> 
                        		<div className={styles.panel}>
                                    {
                                        this.props.createRelevanceLoading?
                                        <div style={{textAlign:'center',}}>
                                            <span style={{display:'inline-block',height:60, lineHeight:2, marginLeft:10, fontSize:16}}>关联中...</span>
                                        </div>
                                        :
                                        <div>
                                            {
                                                this.props.setRevanceStatus?
                                                <div style={{textAlign:'center',}}>
                                                    <Icon type="check-circle" style={{fontSize:30, color:'#79bb51',verticalAlign:'top'}}/>
                                                    <span style={{display:'inline-block',height:60, lineHeight:2, marginLeft:10, fontSize:16}}>已成功关联！</span>
                                                    <div><Link to="/"><Icon type="rollback" />  返回BG关联报表</Link> </div>
                                                </div>
                                                :
                                                <div style={{textAlign:'center',}}>
                                                    <Icon type="frown" style={{fontSize:30, color:'#999',verticalAlign:'top'}}/>
                                                    <span style={{display:'inline-block',height:60, lineHeight:2, marginLeft:10, fontSize:16}}>关联失败</span>
                                                    <div><Link to="/"><Icon type="rollback" />  返回BG关联报表</Link> </div>
                                                </div>
                                            }
                                        </div>
                                    }
                        			
    	                    	</div>
    	                    	
    	                    	<div className={styles.panelBottom}>
    	                    		{
                                        this.props.setRevanceStatus?
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
                                    :<p></p>


                                    }
                                    
    	                    	</div>

                        	</div>
                        	
                        </div>
                    	{/*content end*/}
    				</div>
                </Spin>
			</MainLayout>
        )
    }

    // 根据sku获取单个商品
    getGoodsBySku(urlSku) {

        let sku;

        // 如果已经传入sku，则直接使用，否则获取输入框的sku
        if (urlSku) {
            sku = urlSku;
        }
        else{
            // 获取Input框的sku值
            sku = this.refs.inputSku.refs.input.value;
        }
        console.log(sku)

        if (sku !== '') {
            // 根据sku获取商品详情
            this.props.dispatch({
                type: 'createRelevanceModel/fetchGoodsDetailBySku',
                payload: {
                    site: 'banggood',
                    sku: sku
                }
            })
        } else {
            message.warning("请输入商品的SKU!");
        }
    }

    // 手动输入sku获取单个商品
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
                type: 'createRelevanceModel/fetchGoodsBySkuAndSite',
                payload: {
                    site: site,
                    sku: sku
                }
            });
        } else {
            message.warning("请输入商品的SKU!");
        }
    }

    // 选择站点，切换相似商品栏
    getSite(key){

        // 选择站点
    	let site = this.state.similarGoodsList[key].tname;

        // 存储到state中
    	this.setState({
    		currentSite:site,
            siteKey:key,
    	});


        // 清除搜索的商品
        this.props.dispatch({
            type: 'createRelevanceModel/saveRelevanceGoodsBySite',
            payload: {}
        });
        
        // 清空文本框
        this.refs.inputSku2.refs.input.value = '';

    }

    // 跳转到步骤二
    toStepTwo() {
        if (this.props.goods.code === 200) {
            this.setState({
                step1: 'none',
                step2: '',

                progress2: true,
            })
        } else {
            message.warning("请先输入一个商品");
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

    // 设置相似商品，并跳转到步骤三
    toStepThree() {

        // 已经关联的商品
        const relevanceArray = this.state.relevanceGoodsList;

        // 确认已选商品
        if (relevanceArray.length > 0 && relevanceArray[0]) {

            let args = {};

            relevanceArray.map((item,index) => {

                if (item.site && item.sku) {
                    switch(item.site){
                        case 'gearbest':
                            args = {gearbest:item.sku};
                            break;
                        case 'dx':
                            args = {dx:item.sku};
                            break;
                        case 'aliexpress':
                            args = {aliexpress:item.sku};
                            break;
                        case 'lightinthebox':
                            args = {lightinthebox:item.sku};
                            break;
                        case 'amazon':
                            args = {amazon:item.sku};
                            break;
                        case 'tomtop':
                            args = {tomtop:item.sku};
                            break;
                    }
                    
                }
            });

            console.log('args',args);

            // 请求：设置关联产品
            this.props.dispatch({
                type: 'createRelevanceModel/setRelevanceGoods',
                payload: {
                    sku: this.props.goods.data.sku,
                    relevanceGoodsList: args,
                }
            });

            // 跳转到步骤三
            this.setState({
                step2: 'none',
                step3: '',

                progress2: true,
                progress3: true
            });
        }
        else{
            message.warning("没有关联任何商品"); 
        }
    }

    // 选择相似产品
    selectSimilarGoods(index,item) {

        // 所有站点相似商品
        let parentArray = this.state.similarGoodsList;
        // 该站点的标示
        let parentKey = this.state.siteKey; 

        // 修改子表，呈现选中状态
        if (parentArray[parentKey] && parentArray[parentKey].children) {

            // 循环遍历
            parentArray[parentKey].children.map((obj,childIndex)=>{
                if (childIndex == index) {
                    obj.select = true;
                    //console.log(obj.select)
                }
                else{
                     obj.select = false;
                }
            });

            this.setState({
                similarGoodsList: parentArray
            });

        }


        // 已经选择的商品
    	const relevanceArray = this.state.relevanceGoodsList;

        // 判断该商品是否已选
        if (!relevanceArray.contains(item)) {

            // 每个子表，只能选中一个，所以引用子表的key赋值
            relevanceArray[parentKey] = item;

            this.setState({
                relevanceGoodsList:relevanceArray
            });
        }

    }

    // 选择手动输入的商品
    selectGoodsBySite(){

        // 获取site key
        let parentKey = this.state.siteKey; 
        let goodsite= this.props.goodsBySite;

        // 如果已有数据
        if (goodsite.code == 200) {

            // 加入已选队列中
            const relevanceArray = this.state.relevanceGoodsList;

            // 判断是否已选，没选则选中
            if (!relevanceArray.contains(goodsite.data)) {

                // 每个子表，只能选中一个，所以引用子表的key赋值
                relevanceArray[parentKey] = goodsite.data;

                this.setState({
                    relevanceGoodsList:relevanceArray
                });
            }
            else{

            }

            // 取消其他已经选中的
            this.cancelGoodsSelectStyle();

        }
    }


    // 取消相似商品列表的选中状态
    cancelGoodsSelectStyle(){

        // 搜索站点相似商品
        let parentArray = this.state.similarGoodsList;
        // 当前站点的key
        let parentKey = this.state.siteKey; 
        
        // 修改子表，取消选中状态
        if (parentArray[parentKey] && parentArray[parentKey].children) {

            parentArray[parentKey].children.map((obj,childIndex)=>{
                if (obj.select == true) {
                    obj.select=false
                }
            });

            if (parentArray) {
                this.setState({
                    similarGoodsList: parentArray
                })
            }
        }
    }

    // 移除已选的商品
    cancelRelevanceGoods(index,item){
        // 所有站点的相似商品
        let parentArray = this.state.similarGoodsList;
        // 已经选择的商品
        const relevanceArray = this.state.relevanceGoodsList;

        if (item) {

            // 移除已选商品列表的商品
            relevanceArray.map((obj,index) => {
                if (obj.sku == item.sku) {
                    delete relevanceArray[index];
                }
            });

            // 移除相似商品表的选中状态
            parentArray.map((obj,index) => {
                obj.children.map((obj2,index2) => {
                    if (obj2.sku == item.sku) {
                        obj2.select = false;
                    }
                })
            });

            this.setState({
                relevanceGoodsList:relevanceArray,
                similarGoodsList: parentArray
            });
        }

    }


    // 第一次实例化时，再render渲染后调用
    componentDidMount() {
        
        // 如果是点击sku进来的，跳到步骤二
        if (this.props.params.sku) {
            this.setState({
                title:'编辑关系',
                step1:'none',
                step2:'',

                progress2: true,
            })

            // 根据sku获取商品信息
            this.getGoodsBySku(this.props.params.sku);
        }

        // 获取相识商品数据
        this.setState({
            similarGoodsList:this.props.similarGoodsList,
        })

    }

    // 数据变动时，render渲染后调用
    componentDidUpdate(prevProps, prevState) {

    }


}


function mapStateToProps(state) {
    
    const { 
        goods,                    // 步骤选择的商品
        similarGoodsList,         // 相似的商品列表
        createRelevanceLoading,   // 创建关联中...
        setRevanceStatus,         // 创建关联状态
        goodsBySite               // 手动添加的相似商品
    } = state.createRelevanceModel;

    console.log('similarGoodsList',similarGoodsList);
        

    return {
        goods: goods,
        goodsBySite: goodsBySite,
        similarGoodsList: similarGoodsList,
        createRelevanceLoading: createRelevanceLoading,
        setRevanceStatus: setRevanceStatus
    }
}


export default connect(mapStateToProps)(CreateRelevance);
