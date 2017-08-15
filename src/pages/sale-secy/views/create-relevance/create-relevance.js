/**
 * 创建关系模块
 * Date:2017-06-26
 * Author:zhuangchuhui
 */
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './create-relevance.less';
import { Tabs, Button, Input, Icon, message, Alert, Spin } from 'antd';
import defaultImage from './default.png';
import Clipboard  from 'clipboard'; 
import MainLayout from '../../../../components/layout-main/layout-main';
import MenuBar from '../menu-bar/menu-bar';

const TabPane = Tabs.TabPane;


class CreateRelevance extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '创建关系',

            // 步骤模块
            step1: '',
            step2: 'none',
            step3: 'none',

            // 进度模块
            progress1: true,
            progress2: false,
            progress3: false,

            // 所有相似的产品
            similarGoodsList: [],
            siteKey: 0,
            marginLeftVal: 0,

            // 选中的产品
            relevanceGoodsList: [],

        }
    }

    render() {
        return (
            <MainLayout headerMenuText="销售秘书">
                {/* 导航 */}
                <MenuBar />

                <div className={styles.mainWrap}>
                    <Spin spinning={this.props.createRelevanceLoading}>
                        <div className={styles.relevanceWrap}>

                            <div className={styles.title}>
                                <span>{this.state.title}</span>
                            </div>

                            {/*进度条 start*/}
                            <div className={styles.progressWrap}>
                                <div className={styles.progressBg}>
                                    <ul>
                                        <li className={this.state.progress1 ? styles.current : null}>
                                            <div className={styles.circleBg}>
                                                <div className={styles.circleText}>1</div>
                                            </div>
                                            <p className={styles.text}>第1步 <br /> 填写要关联的BG-SKU </p>
                                        </li>
                                        <li className={this.state.progress2 ? styles.current : null}>
                                            <div className={styles.circleBg}>
                                                <div className={styles.circleText}>2</div>
                                            </div>
                                            <p className={styles.text}>第2步 <br /> 选择关联的外点-SKU </p>
                                        </li>
                                        <li className={this.state.progress3 ? styles.current : null}>
                                            <div className={styles.circleBg}>
                                                <div className={styles.circleText}><Icon type="check" /></div>
                                            </div>
                                            <p className={styles.text}>第3步 <br /> 确认完成关联 </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/*进度条 end*/}

                            {/*content start*/}
                            <div id="content" className={styles.content}>

                                {/*步骤一*/}
                                <div style={{ display: this.state.step1 }}>
                                    <div className={styles.stepOneWrap}>
                                        <div className={styles.imgWrap}>
                                            {
                                                this.props.goods.data ?
                                                    <img src={this.props.goods.data.img_url} />
                                                    : <span></span>
                                            }
                                        </div>
                                        <div className={styles.inputWrap}>
                                            <p>输入BG-SKU，<br />根据SKU获取其主图并显示</p>
                                            <Input style={{ width: 150 }} placeholder="输入SKU" ref="inputSku" />
                                            <Button style={{ marginLeft: 5 }} onClick={this.getGoodsBySku.bind(this, null)}>获取</Button>
                                            <div style={{ height: 50 }}>
                                                {
                                                    this.props.goods.msg ?
                                                        <p style={{ color: 'red' }}>{this.props.goods.msg}</p>
                                                        : null
                                                }
                                            </div>
                                        </div>

                                    </div>

                                    <div style={{ textAlign: 'center', height: 100 }}>
                                        <Link to="/goods" style={{display: 'inline-block',marginRight: 10}}><Button style={{ width: 100 }}>返回</Button></Link>
                                        {/* <Button style={{ width: 100 }} onClick={this.jumpBGList.bind(this,'/bg')}>返回</Button> */}
                                        <Button type="primary" style={{ width: 100 }} onClick={this.toStepTwo.bind(this)}>下一步</Button>
                                    </div>
                                </div>


                                {/*步骤二*/}
                                <div style={{ display: this.state.step2 }}>
                                    {
                                        /* 选中的BG商品 */
                                        this.props.goods.data ?
                                        <div>
                                            <div className={styles.panel}>
                                                <div className={styles.skuToGoods}>
                                                    <div className={styles.skuImg}>
                                                        <img src={this.props.goods.data.img_url} />
                                                    </div>
                                                    <p>BG</p>
                                                </div>

                                                {/*相似的商品 start*/}
                                                <div style={{ width: 800, height: 400, display: 'inline-block' }}>
                                                    {
                                                        this.props.similarGoodsList ?
                                                            <div>
                                                                <Tabs defaultActiveKey='tabpane-0' onChange={this.getSite.bind(this)} style={{height:312}}>
                                                                    {
                                                                        this.props.similarGoodsList.map((item, index) =>
                                                                            <TabPane tab={item.tname} key={`tabpane-${item.tkey}`}>
                                                                                {
                                                                                    this.getItemList(item.children)
                                                                                }
                                                                            </TabPane>
                                                                        )
                                                                    }
                                                                </Tabs>
                                                                {/*手动输入商品*/}
                                                                <div style={{ marginLeft: 25, marginTop: 20 }}>
                                                                    <Input style={{ width: 150 }} placeholder="手动添加sku或url" ref="inputSku2" />
                                                                    <Button style={{ marginLeft: 5 }} onClick={this.getGoodsBySiteAndSku.bind(this)}>搜索</Button>
                                                                    {
                                                                    /*  this.props.goodsBySite.code == 200 ?
                                                                            <Button style={{ marginLeft: 5 }} onClick={this.selectGoodsBySite.bind(this)}>选中该商品</Button>
                                                                            : null */

                                                                    }

                                                                    <span style={{ marginLeft: 10, color: 'red' }}>
                                                                        {
                                                                            this.props.goodsBySite.code == 200 ?
                                                                                <span>{this.props.goodsBySite.msg}</span>
                                                                                : <span>{this.props.goodsBySite.msg}</span>
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            : null
                                                    }


                                                </div>
                                                {/*相似的商品 end*/}

                                            </div>

                                            <div className={styles.panelBottom}>
                                                <div className={styles.title}>关联产品</div>
                                                {/*选中的商品 start*/}
                                                <ul className={styles.similarGoods}>
                                                    {
                                                        this.state.relevanceGoodsList.map((item, index) =>
                                                            <li className={styles.deleteSelectGoods} key={`relevance-${index}`}>
                                                                <div className={styles.goodsShowPanel} onClick={this.cancelRelevanceGoods.bind(this, index, item)}>
                                                                    <div className={styles.imgWrap}><img src={item.img_url} /></div>
                                                                    <div className={styles.deleteItemShow}></div>
                                                                </div>
                                                                <div><p className={styles.brand}>{item.site}</p></div>
                                                                <div><Button className='copyUrl' type="dashed" size="small" data-clipboard-text={item.product_url} onClick={this.onCopyUrl.bind(this)}>复制链接</Button></div>
                                                            </li>
                                                        )
                                                    }

                                                </ul>
                                                {/*选中的商品 end*/}

                                                <div style={{ textAlign: 'center', height: 100, margin: '60px auto' }}>
                                                    {
                                                        /*如果是编辑关系，则不显示上一步*/
                                                        !this.props.params.sku ?
                                                            <Button style={{ marginRight: 10, width: 100 }} onClick={this.toStepOne.bind(this)}>返回</Button>
                                                            : 
                                                            <Link to="/goods" style={{display: 'inline-block',marginRight: 10}}><Button style={{ width: 100 }}>返回</Button></Link>
                                                    }

                                                    <Button type="primary" style={{ width: 100 }} onClick={this.toStepThree.bind(this)}>关联</Button>
                                                </div>
                                            </div>
                                        </div>
                                        :null
                                    }

                                </div>


                                {/*步骤三*/}
                                <div style={{ display: this.state.step3 }}>
                                    <div className={styles.panel}>
                                        {
                                            this.props.createRelevanceLoading ?
                                                <div style={{ textAlign: 'center', }}>
                                                    <span style={{ display: 'inline-block', height: 60, lineHeight: 2, marginLeft: 10, fontSize: 16 }}>关联中...</span>
                                                </div>
                                                :
                                                <div>
                                                    {
                                                        this.props.setRevanceStatus ?
                                                            <div style={{ textAlign: 'center', }}>
                                                                <Icon type="check-circle" style={{ fontSize: 30, color: '#79bb51', verticalAlign: 'top' }} />
                                                                <span style={{ display: 'inline-block', height: 60, lineHeight: 2, marginLeft: 10, fontSize: 16 }}>已成功关联！</span>
                                                                <div><Link to="/goods"><Icon type="rollback" />返回BG关联报表</Link> </div>
                                                                
                                                            </div>
                                                            :
                                                            <div style={{ textAlign: 'center', }}> 
                                                                <Icon type="frown" style={{ fontSize: 30, color: '#999', verticalAlign: 'top' }} />
                                                                <span style={{ display: 'inline-block', height: 60, lineHeight: 2, marginLeft: 10, fontSize: 16 }}>关联失败</span>
                                                                <div><Link to='/goods'><Icon type="rollback" />返回BG关联报表</Link> </div>
                                                            </div>
                                                    }
                                                </div>
                                        }

                                    </div>

                                    <div className={styles.panelBottom}>
                                        <div className={styles.title}>已关联产品</div>
                                        {
                                            this.props.setRevanceStatus ?
                                                <ul className={styles.similarGoods}>
                                                    {
                                                        this.state.relevanceGoodsList.map((item, index) =>
                                                            <li key={`suc-relevance-${index}`}>
                                                                <div className={styles.goodsShowPanel}>
                                                                    <div className={styles.imgWrap}><img src={item.img_url} /></div>
                                                                    <p className={styles.brand}>{item.site}</p>
                                                                </div>
                                                                <div>
                                                                    <Button className='copyUrl' type="dashed" size="small" data-clipboard-text={item.product_url} onClick={this.onCopyUrl.bind(this)}>复制链接</Button>
                                                                </div>
                                                            </li>
                                                        )
                                                    }
                                                </ul>
                                                :null
                                        }

                                    </div>

                                </div>

                            </div>
                            {/*content end*/}
                        </div>
                    </Spin>
                </div>
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
        else {
            // 获取Input框的sku值
            sku = this.refs.inputSku.refs.input.value;
        }

        if (sku !== '') {
            // 根据sku获取商品详情
            this.props.dispatch({
                type: 'CreateRelevanceModel/fetchGoodsDetailBySku',
                payload: {
                    site: 'banggood',
                    sku: sku
                }
            })
        } else {
            message.destroy();
            message.warning("请输入商品的SKU!");
        }
    }

    /**
     * 手动输入sku搜索单个商品
     */
    getGoodsBySiteAndSku() {

        // 获取Input框的sku值
        let sku = this.refs.inputSku2.refs.input.value;

        let site;

        if (this.state.currentSite) {
            site = this.state.currentSite
        }
        else {
            site = this.state.similarGoodsList[0].tname;
        }

        if (sku !== '') {
            // 根据sku获取商品详情
            this.props.dispatch({
                type: 'CreateRelevanceModel/fetchGoodsBySkuAndSite',
                payload: {
                    site: site,
                    sku: sku
                }
            });



            // 使用定时把请求的数据返回
            this.timeout(1000).then((value) => {
                this.selectGoodsBySite();
            });
            // 有时候请求比较久，追加一个
            this.timeout(3000).then((value) => {
                this.selectGoodsBySite();
            });

        } else {
            message.destroy();
            message.warning("请输入商品的SKU!");
        }
    }

    // 选择手动输入的商品
    selectGoodsBySite() {

        // 获取site key
        let parentKey = this.state.siteKey;
        let goodsite = this.props.goodsBySite;
        console.log('goodsite',goodsite);
        // 如果已有数据
        if (goodsite.code == 200) {

            // 加入已选队列中
            const relevanceArray = this.state.relevanceGoodsList;

            // 判断是否已选，没选则选中
            if (!relevanceArray.contains(goodsite.data)) {

                // 每个子表，只能选中一个，所以引用子表的key赋值
                relevanceArray[parentKey] = goodsite.data;

                this.setState({
                    relevanceGoodsList: relevanceArray
                });
            }

            // 取消其他已经选中的
            this.cancelGoodsSelectStyle();

        }
    }


    // 选择站点，切换相似商品栏
    getSite(key) {

        key = key.split('-')[1];
        
        // 选择站点
        let site = this.props.similarGoodsList[key].tname;

        // 存储到state中
        this.setState({
            currentSite: site,
            siteKey: key,
            marginLeftVal: 0,  // 清除移动
        });


        // 清除搜索的商品
        this.props.dispatch({
            type: 'CreateRelevanceModel/saveRelevanceGoodsBySite',
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
            message.destroy();
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

    // 设置关联，并跳转到步骤三
    toStepThree() {

        // 已经关联的商品
        const relevanceArray = [];

        // 清除数组中为undefined的元素
        this.state.relevanceGoodsList.map((item, index) => {
            if (item !== undefined) {
                relevanceArray.push(item);
            }
        });

        // 确认已选商品，没有数据也可以关联
        if (relevanceArray.length > 0) {

            let args = {};

            // 转换参数格式
            relevanceArray.map((item, index) => {
                if (item.site && item.sku) {
                    switch (item.site) {
                        case 'gearbest':
                            args['gearbest'] = item.sku;
                            break;
                        case 'dx':
                            args['dx'] = item.sku;
                            break;
                        case 'aliexpress':
                            args['aliexpress'] = item.sku;
                            break;
                        case 'lightinthebox':
                            args['lightinthebox'] = item.sku;
                            break;
                        case 'amazon':
                            args['amazon'] = item.sku;
                            break;
                        case 'tomtop':
                            args['tomtop'] = item.sku;
                            break;
                    }
                }
            });

            // 请求：设置关联产品
            this.props.dispatch({
                type: 'CreateRelevanceModel/setRelevanceGoods',
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

            // 清除步骤一搜索的商品
            this.props.dispatch({
                type: 'CreateRelevanceModel/saveRelevanceGoods',
                payload: {}
            });
            // 清除步骤二手动搜索的商品
            this.props.dispatch({
                type: 'CreateRelevanceModel/saveRelevanceGoodsBySite',
                payload: {}
            });
        }
        else {
            message.destroy();
            message.warning("没有关联任何商品");
        }
    }

    // 选择相似产品
    selectSimilarGoods(index, item) {

        // 所有站点相似商品
        let parentArray = this.props.similarGoodsList;
        // 该站点的标示
        let parentKey = this.state.siteKey;

        // 修改子表，呈现选中状态
        if (parentArray[parentKey] && parentArray[parentKey].children) {

            // 循环遍历
            parentArray[parentKey].children.map((obj, childIndex) => {
                if (childIndex == index) {
                    obj.select = true;
                    
                }
                else {
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
                relevanceGoodsList: relevanceArray
            });
        }

        
    }


    // 取消相似商品列表的选中状态
    cancelGoodsSelectStyle() {

        // 搜索站点相似商品
        let parentArray = this.state.similarGoodsList;
        // 当前站点的key
        let parentKey = this.state.siteKey;

        // 修改子表，取消选中状态
        if (parentArray[parentKey] && parentArray[parentKey].children) {

            parentArray[parentKey].children.map((obj, childIndex) => {
                if (obj.select == true) {
                    obj.select = false
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
    cancelRelevanceGoods(index, item) {
        // 所有站点的相似商品
        let parentArray = this.state.similarGoodsList;
        // 已经选择的商品
        const relevanceArray = this.state.relevanceGoodsList;

        if (item) {

            // 移除已选商品列表的商品
            relevanceArray.map((obj, index) => {
                if (obj.sku == item.sku) {
                    delete relevanceArray[index];
                }
            });

            // 移除相似商品表的选中状态
            parentArray.map((obj, index) => {
                obj.children.map((obj2, index2) => {
                    if (obj2.sku == item.sku) {
                        obj2.select = false;
                    }
                })
            });

            this.setState({
                relevanceGoodsList: relevanceArray,
                similarGoodsList: parentArray
            });
        }

    }

    /**
     * 获取相似商品数据，并载入
     * @param {object} data 
     */
    getItemList(data) {
        if (data) {
            return (
                <div className={styles.similarGoodsWrap}>
                    {
                        // 但相似商品多于5件时，才有左右切换
                        data.length > 5 ?
                            <div>
                                <Icon type="left" className={styles.arrowLeft} onClick={this.onMoveLeft.bind(this, data.length)} />
                                <Icon type="right" className={styles.arrowRight} onClick={this.onMoveRight.bind(this, data.length)} />
                            </div>
                            : null
                    }
                    <div className={styles.similarGoods}>
                        {

                            data.length > 0 ?
                                <ul ref='listWrapId' style={{ width: data.length * (130 + 20), marginLeft: this.state.marginLeftVal }}>
                                    {
                                        data.map((item2, index2) => (
                                            <li key={`li-${index2}`} >
                                                <div className={item2.select ? styles.goodsShowPanelCurrent : styles.goodsShowPanel}
                                                     id={item2.cid} onClick={this.selectSimilarGoods.bind(this, index2, item2)}
                                                     
                                                     >
                                                    <div className={styles.imgWrap} onMouseEnter={this.showGoodsDetail.bind(this,item2)} onMouseLeave={this.hideGoodsDetail.bind(this)}>
                                                        <img src={item2.img_url} />
                                                    </div>
                                                </div>
                                                <div><Button className='copyUrl' type="dashed" size="small" data-clipboard-text={item2.product_url} onClick={this.onCopyUrl.bind(this)}>复制链接</Button></div>
                                            </li>
                                        ))

                                    }
                                </ul>
                                :
                                <p>我已经找遍大江南北，也没有找到相似的商品，要么你手动添加试试吧！</p>
                        }
                    </div>
                </div>
            )
        }
        else {
            return (<div>null</div>)
        }
    }

    /**
     * 显示相似商品的详情
     * @param {object} detail 
     */
    showGoodsDetail(detail){

        let div = document.createElement('div'),
            img = document.createElement('img'),
            p   = document.createElement('p');

        div.setAttribute('id','detailShow');
        p.innerHTML = `【商品名称】：${detail.products_name_en}`;
        img.setAttribute('src',detail.img_url);
        
        div.appendChild(img);
        div.appendChild(p);

        div.style.position   = 'fixed';
        div.style.right      = '50px';
        div.style.bottom     = '50px';
        div.style.width      = '400px';
        div.style.height     = '450px';
        div.style.background = '#fff';
        div.style.overflow   = 'hidden';
        div.style.boxShadow  = '0 5px 15px #999';
        div.style.padding    = '10px';
        div.style.borderRadius = '5px';

        p.style.overflow     = 'hidden';
        p.style.whiteSpace   = 'nowrap';
        p.style.textOverflow = 'ellipsis';
        p.style.lineHeight   = '30px';

        img.style.width      = '100%';
        img.style.height     = 'auto';
        img.style.maxHeight  = '370px';

        document.querySelector('#content').appendChild(div);

    }

    /**
     * 隐藏相似商品的详情
     */
    hideGoodsDetail(){
        document.querySelector('#detailShow').remove();
    }


    // 相似商品表左边切换
    onMoveLeft(length) {
        const itemVal = 750;
        const currentVal = this.state.marginLeftVal;

        if (currentVal < 0) {
            this.setState({
                marginLeftVal: (currentVal + itemVal),
            })
        }
    }

    // 相似商品表右边切换
    onMoveRight(length) {
        const itemVal = 750;
        const maxVal = -(750 * Math.ceil(length / 5));
        const currentVal = this.state.marginLeftVal;

        if (currentVal > (maxVal + itemVal)) {

            this.setState({
                marginLeftVal: (currentVal - itemVal),
            });
        }
    }

    /**
     * 异步定时器
     * @param {时间} ms 
     */
    timeout(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms, 'done');
        });
    }


    /**
     * 把获取的相似商品，取到本地state里面
     */
    syncRelevanceGoodsLlist() {
        let propsRelevanceGoodsList = this.props.relevanceGoodsList;
        let stateRelevanceGoodsList = this.state.relevanceGoodsList;
        //console.log('relevan:',propsRelevanceGoodsList,stateRelevanceGoodsList);

        if (propsRelevanceGoodsList) {
            let index;
            let obj;
            for (let item in propsRelevanceGoodsList) {
                switch (item) {
                    case 'gearbest':
                        index = 0;
                        obj = propsRelevanceGoodsList[item];
                        break;
                    case 'lightinthebox':
                        index = 1;
                        obj = propsRelevanceGoodsList[item];
                        break;
                    case 'dx':
                        index = 2;
                        obj = propsRelevanceGoodsList[item];
                        break;
                    case 'tomtop':
                        index = 3;
                        obj = propsRelevanceGoodsList[item];
                        break;
                }

                stateRelevanceGoodsList[index] = obj;

                this.setState({
                    relevanceGoodsList: stateRelevanceGoodsList,
                });
                console.log('stateRelevanceGoodsList',stateRelevanceGoodsList);
            }
        }
    }
    
    /**
     * 清空数据
     */
    clearAllData(){

        this.props.dispatch({
            type: 'CreateRelevanceModel/saveRelevanceGoods',
            payload: {},
        });

        this.props.dispatch({
            type: 'CreateRelevanceModel/saveSimilarGoodsList',
            payload: {},
        });

        this.props.dispatch({
            type: 'CreateRelevanceModel/saveRelevanceGoodsList',
            payload: {},
        });

    }

    /**
     * 复制产品url的提醒
     * @param {string} url 
     */
    onCopyUrl(url){
        message.destroy();
        message.warning("复制成功！");
    }



    // render 前
    componentWillMount(){
        this.clearAllData();

        const clipboard  = new Clipboard('.copyUrl');
    }

    // render 后
    componentDidMount() {

        // 如果是点击列表的sku进来的，跳到步骤二
        if (this.props.params.sku) {
            this.setState({
                title: '编辑关系',
                step1: 'none',
                step2: '',

                progress2: true,
            })

            // 根据sku获取商品信息
            this.getGoodsBySku(this.props.params.sku);
        }

        this.timeout(1000).then((value) => {
            // 获取相识商品数据
            this.setState({
                similarGoodsList: this.props.similarGoodsList,
            });

            this.syncRelevanceGoodsLlist();
        });
        
        // 定时获取数据
        this.timeout(4000).then((value) => {
            // 获取相识商品数据
            this.setState({
                similarGoodsList: this.props.similarGoodsList,
            });

            this.syncRelevanceGoodsLlist();
        });

    }


}

function mapStateToProps(state) {
    return { ...state.CreateRelevanceModel };
}

export default connect(mapStateToProps)(CreateRelevance);
