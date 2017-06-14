import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, DatePicker, Input, InputNumber, Select, Tag } from 'antd';
import moment from 'moment';
import styles from './Searcher.less';

const { MonthPicker, RangePicker } = DatePicker;
const SubMenu = Menu.SubMenu;
const InputGroup = Input.Group;
const dateFormat = "YYYY-MM-DD";

const log = ({ item, key }) => {
    /*let text = item.props.children.props.children;
    console.log(`点击了菜单${text}`);*/
}

class Searcher extends Component {
    constructor(props, context) {
        super(props, context);
        
        // 搜索条件
        this.state = {
            args: {
                site: '',
                cid: '',
                bid: '',
                status: '',
                sku: '',
                related: '',
                price1: '',
                price2: '',
            }
        }
    }

    // 搜索
    handlerSearchClick(e) {
        e.preventDefault();

        // 搜索条件赋值
        const price1 = document.getElementById('price1').value,
            price2 = document.getElementById('price2').value,
            sku = document.getElementById('sku').value;

        this.state.args.price1 = price1;
        this.state.args.price2 = price2;
        this.state.args.sku = sku;


        // 搜索
        this.props.handleSearchArgs(this.state.args);

    }

    // 选择站点
    handleSiteMenu = ({ item, key }) => {
        const text = item.props.children.props.children;
        this.state.args.site = text;
        this.refs.siteMenu.innerText = text;
    }

    // 选择分类
    handleCateMenu = ({ item, key }) => {
        const text = item.props.children.props.children;
        this.state.args.cid = text;
        this.refs.cateMenu.innerText = text;
    }

    // 选择品牌
    handleBrandMenu = ({ item, key }) => {
        const text = item.props.children.props.children;
        this.state.args.bid = text;
        this.refs.brandMenu.innerText = text;
    }

    // 选择是否关联产品
    handleRelatedMenu = ({ item, key }) => {
        const text = item.props.children.props.children;
        this.state.args.status = text;
        this.refs.relatedMenu.innerText = text;
    }

    // 把搜索条件转换成数组
    getObjectValToArray = () => {
        const objectArgs = this.state.args;
        let str = [];
        for (let i in objectArgs) {
            if (objectArgs[i] !== "") {
                let tagString = this.tagString(i);
                str.push(`${tagString}:  ${objectArgs[i]}`);
            }
        }
        return str;
    }

    tagString = (tag) => {
        let tagString = "";
        switch(tag){
            case "site":
                tagString = "站点";
                break;
            case "cid":
                tagString = "分类";
                break 
            case "bid":
                tagString = "品牌";
                break 
            case "status":
                tagString = "关联状态";
                break 
            case "price1":
                tagString = "价格区间1";
                break 
            case "price2":
                tagString = "价格区间2";
                break 
            case "sku":
                tagString = "SKU";
                break 
        }
        return tagString; 
    }


    render() {

        // 站点菜单
        const siteMenu = (
            <Menu onClick={ this.handleSiteMenu }>
				{
					this.props.menus.site.map((i,index) => <Menu.Item key={index}><span>{i}</span></Menu.Item>)
				}
			</Menu>
        )

        // 分类菜单
        const cateMenu = (
            <Menu onClick={ this.handleCateMenu }>
				{
					//this.props.menus.cate.gearbest.map((i,index) => <Menu.Item key={i.cid}><span>{i.cname}</span></Menu.Item>)
                    /*this.props.menus.cate.gearbest.map((i,index) => 
                        i.children !=null ?  
                        <SubMenu title={i.cname}>
                            <Menu.Item ><span> {i.children[0]} 00000</span></Menu.Item>)
                        </SubMenu>
                        :<Menu.Item key={i.cid}><span>{i.cname}</span></Menu.Item>) */
				}

                <SubMenu title='gearbest'>
                     <Menu.Item key="2"><span>Remote Control Toys</span></Menu.Item>
                     <Menu.Item key="31"><span>Movies & TV Action Figures</span></Menu.Item>
                </SubMenu>
                <SubMenu title='banggood'>
                     <Menu.Item key="40565"><span>EDC Gadgets</span></Menu.Item>
                     <Menu.Item key="40617"><span>Home Audio & Video</span></Menu.Item>
                </SubMenu>

			</Menu>
        )

        // 品牌菜单
        const brandMenu = (
            <Menu onClick={ this.handleBrandMenu }>
				{
					this.props.menus.brand.map((i,index) => <Menu.Item key={index}><span>{i.bname}</span></Menu.Item>)
				}
			</Menu>
        )

        // 关联菜单
        const relatedMenu = (
            <Menu onClick={ this.handleRelatedMenu }>
                <Menu.Item key="0"><span>未关联</span></Menu.Item>
				<Menu.Item key="1"><span>已关联</span></Menu.Item>
			</Menu>
        )


        return (
            <div className={ styles.searchWrap}>
				<div className={ styles.searchArgs }>
					<span>筛选范围 <Icon type="right" className={styles.iconRight}/> </span>
					<span id="tagList"></span>
					{ 
						this.getObjectValToArray().map((item,index) => <Tag closable className={styles.tag} onClose={ log }> { item } </Tag>)
					}
					{/*<Tag closable className={styles.tag} onClose={log}> sku: { this.props.searchArgs.sku } </Tag>*/}
				</div>
				<div className={ styles.main }>
					<div className={ styles.title }>
						<span>筛选分类</span>
					</div>
					<div className={ styles.searchContent}>
						<div className={ styles.searchLeft }>
							<Dropdown overlay={ siteMenu } trigger={['click']}>
								<Button style={{ marginRight:10, marginBottom:10}}>
									<span ref="siteMenu">站点</span>
									<Icon type="down" />
								</Button>
							</Dropdown>
							<Dropdown overlay={ cateMenu } trigger={['click']}>
								<Button style={{ marginRight:10, marginBottom:10}}> 
                                    <span ref="cateMenu">分类</span>
									<Icon type="down" />
								</Button>
							</Dropdown>
							<Dropdown overlay={ brandMenu } trigger={['click']} style="maxHeight:100,overFlow:hidden,"> 
								<Button style={{ marginRight:10, maxHeight:100 }}> 
                                    <span ref="brandMenu">品牌</span>
									<Icon type="down" />
								</Button>
							</Dropdown>
							<Dropdown overlay={ relatedMenu } trigger={['click']}>
								<Button style={{ marginRight:10, marginBottom:10}}> 
                                    <span ref="relatedMenu">关联状态</span>
									<Icon type="down" />
								</Button>
							</Dropdown>
							<InputGroup compact className={styles.dateGroup}>
								<Input id="price1" 
									style={{ width: 80, textAlign: 'center' }} 
									placeholder="价格区间"  />
			          			<Input style={{ width: 24, borderLeft: 0, pointerEvents: 'none' }} placeholder="~" />
			          			<Input id="price2" 
			          				style={{ width: 80, textAlign: 'center', borderLeft: 0,marginRight:10 }} 
			          				placeholder="价格区间" 
			          			/>
							</InputGroup>
			          		<Input id="sku" style={{ width: 140 }} placeholder="sku" />
							
						</div>
						<div className={ styles.searchRight }>
							<Button type="primary" style={{ width: 150 }} onClick={ this.handlerSearchClick.bind(this) }>搜索</Button>
						</div>

					</div>

				</div>
				
				{ /*传参数进来*/ }
				{/*<p>{this.props.searchArguments.com}</p>*/} 
				{/*<p>{ this.props.menus.cate.map((i,index) => <p>{ i.cname }</p>) }</p>*/}

			</div>

        );
    }

    componentDidMount() {
        /*console.log("menus");
        console.log(this.props.menus);*/
    }

}


export default Searcher;
