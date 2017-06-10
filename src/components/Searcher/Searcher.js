import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, DatePicker, Input, InputNumber, Select, Tag } from 'antd';
import moment from 'moment';
import styles from './Searcher.less';

const { MonthPicker, RangePicker } = DatePicker;
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
                cate: '',
                brand: '',
                sku: '',
                related: '',
                price1: '',
                price2: '',
                page: 1
            }
        }
    }

    // 搜索
    handlerSearchClick(e) {
        e.preventDefault();


        // 赋值
        const price1 = document.getElementById('price1').value,
            price2 = document.getElementById('price2').value,
            sku = document.getElementById('sku').value;

        this.state.args.price1 = price1;
        this.state.args.price2 = price2;
        this.state.args.sku = sku;


        // 搜索
        this.props.handleSearchArgs(this.state.args);

    }

    // 选择分类
    handleCateMenu = ({ item, key }) => {
        const text = item.props.children.props.children;
        this.state.args.cate = text;
    }

    // 选择站点
    handleSiteMenu = ({ item, key }) => {
        const text = item.props.children.props.children;
        this.state.args.site = text;
    }

    // 选择品牌
    handleBrandMenu = ({ item, key }) => {
        const text = item.props.children.props.children;
        this.state.args.brand = text;
    }

    // 选择是否关联产品
    handleRelatedMenu = ({ item, key }) => {
        const text = item.props.children.props.children;
        this.state.args.related = text;
    }

    // 把搜索条件转换成数组
    getObjectValToArray = () => {
        const objectArgs = this.state.args;
        let str = [];
        for (let i in objectArgs) {
            if (objectArgs[i] !== "") {
                str.push(`${i}:  ${objectArgs[i]}`);
            }
        }
        return str;
    }


    render() {

        // 站点菜单
        const siteMenu = (
            <Menu onClick={ this.handleSiteMenu }>
				{
					this.props.menus.site.map((i,index) => <Menu.Item key={index}><span>{i.banggood}</span></Menu.Item>)
				}
			</Menu>
        )

        // 分类菜单
        const cateMenu = (
            <Menu onClick={ this.handleCateMenu }>
				{
					this.props.menus.cate.map((i,index) => <Menu.Item key={i.cid}><span>{i.cname}</span></Menu.Item>)
				}
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
				<Menu.Item key="1"><span>已关联</span></Menu.Item>
				<Menu.Item key="0"><span>未关联</span></Menu.Item>
			</Menu>
        )


        return (
            <div className={ styles.searchWrap}>
				<div className={ styles.searchArgs }>
					<span>筛选范围 <Icon type="right" className={styles.iconRight}/> </span>
					<span id="tagList"></span>
					{ 
						this.getObjectValToArray().map((item,index) => <Tag closable className={styles.tag} onClose={log}> { item } </Tag>)
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
									分类 <Icon type="down" />
								</Button>
							</Dropdown>
							<Dropdown overlay={ brandMenu } trigger={['click']}> 
								<Button style={{ marginRight:10 }}> 
									品牌 <Icon type="down" />
								</Button>
							</Dropdown>
							<Dropdown overlay={ relatedMenu } trigger={['click']}>
								<Button style={{ marginRight:10, marginBottom:10}}> 
									关联状态 <Icon type="down" />
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
