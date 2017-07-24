/**
 * 竞品报表搜索模块
 * Date: 2017-07-10
 * Author: zhuangchuhui
 */

import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, DatePicker, Input, InputNumber, Select, Tag, Cascader } from 'antd';
import moment from 'moment';
import styles from './search-bar.less';

const { MonthPicker, RangePicker } = DatePicker;
const SubMenu = Menu.SubMenu;
const InputGroup = Input.Group;
const Option = Select.Option;
const dateFormat = "YYYY-MM-DD";

// 默认抓取时间为一个月内
const firstDay = moment(new Date()).subtract(30,"days").format("YYYY-MM-DD");
const lastDay  = moment().format('YYYY-MM-DD');

class SearchBar extends Component {
    constructor(props, context) {
        super(props, context);
 
        // 搜索条件
        this.state = {
            status: '',

            args: {
                site: '',
                cid: '',
                bid: '',
                status: '',
                sku: '', 
                price1: '',
                price2: '',
                startTime:firstDay,
                endTime:lastDay,
                page: 1,
            },
            argsShow: {
                site: '',
                cid: '',
                bid: '',
                status: '',
                sku: '',
                price1: '',
                price2: '',
                startTime:'',
                endTime:'',
            }
        }
    }

    render() {

        // 关联状态菜单
        const relatedMenu = (
            <Menu onClick={ this.handleRelatedMenu }>
                <Menu.Item key="0"><span>全部</span></Menu.Item>
                <Menu.Item key="1"><span>已关联</span></Menu.Item>
                <Menu.Item key="2"><span>未关联</span></Menu.Item>
            </Menu>
        )


        return (

            <div className={ styles.searchWrap}>
                <div className={ styles.searchArgs }>
                    <span>筛选范围 <Icon type="right" className={styles.iconRight}/> </span>
                    <span id="tagList">
                        { this.getObjectValToArray() }
                    </span>
                    { 
                        /*this.getObjectValToArray().map((item,index) => <Tag className={styles.tag} onClose={ this.delTag.bind(this) }> { item } </Tag>)*/
                    }
                </div>
                <div className={ styles.main }>
                    {/* <div className={ styles.title }>
                        <span>筛选分类</span>
                    </div> */}

                    {/*搜索栏 start*/}
                    <div className={ styles.searchContent}>
                        <div className={ styles.searchLeft }>
                        
                            <Cascader 
                                options={ this.props.menus.cate }  
                                onChange={ this.handleCateMenu } 
                                placeholder="站点-分类" 
                                changeOnSelect 
                                allowClear 
                                style={{ marginRight:10, width:300, marginBottom:10}}
                            />
                            
                            <Select
                                showSearch
                                style={{ width: 200, marginRight:10, verticalAlign:'top'}}
                                placeholder="品牌"
                                optionFilterProp="children" 
                                onSelect={ this.handleBrandMenu } 
                                labelInValue 
                                allowClear 
                                > 

                                {
                                    this.props.menus.brand?
                                        this.props.menus.brand.map((i,index) => <Option key={index} value={i.bid}>{i.bname}</Option>)
                                        :null
                                    //this.props.menus.brand.map((i,index) => <Option key={i.bid}>{i.bname}</Option>)
                                }
                            </Select>

                            <Dropdown overlay={ relatedMenu } trigger={['click']}>
                                <Button style={{ marginRight:10, marginBottom:10 ,verticalAlign:'top'}}> 
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

                            <Input id="sku" style={{ width: 140, verticalAlign:'top'}} placeholder="sku" />
                            
                            <div className={ styles.pickerDate }  >
                                <RangePicker 
                                    defaultValue={[
                                        moment(new Date()).subtract(30,"days"),
                                        moment(),
                                    ]} 
                                    ranges={{ 
                                        '今天': [moment(), moment()],
                                        '本周': [moment(), moment().endOf('week')], 
                                        '本月': [moment(), moment().endOf('month')] 
                                    }} 
                                    format="YYYY-MM-DD" 
                                    style={{ width:210 }}
                                    onChange={ this.getTime }
                                    allowClear={false}
                                />
                            </div>
                            
                        </div>
                        <div className={ styles.searchRight }>
                            <Button type="primary" 
                                style={{ width: 150,marginBottom: 10 }} 
                                onClick={ this.handlerSearchClick.bind(this) }>搜索</Button>
                            
                            
                        </div>
                    </div>
                    {/*搜索栏 end*/}

                </div>

            </div>

        );
    }


    // 删除标签（未完成）
    delTag = (item, key) => {
        console.log("delete tag")
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
        this.state.args.page = 1;

        this.state.argsShow.price1 = price1;
        this.state.argsShow.price2 = price2;
        this.state.argsShow.sku = sku;


        // 搜索
        this.props.handleSearchArgs(this.state.args);

    }


    // 选择分类
    handleCateMenu = (value, selectedOptions) => {

        var len = value.length;

        if (len == 1) {
            this.state.args.site = value[0];
            this.state.args.cid = '';
            this.state.argsShow.site = value[0];
            this.state.argsShow.cid = '';
        }
        
        if (len > 1) {
            this.state.args.site = value[0];
            this.state.args.cid = value[len - 1];
            this.state.argsShow.cid = selectedOptions[len-1].label;
        }

        if(len<1){
            this.state.args.cid ='';
            this.state.argsShow.cid ='';
        }
        
    }

    // 选择品牌
    handleBrandMenu = (value,select) => {
        if(value){
            this.state.args.bid = value;
            this.state.argsShow.bid = select.props.children; 
        }else{
            this.state.args.bid = '';
            this.state.argsShow.bid = ''; 
        }
    }

    // 选择是否关联产品
    handleRelatedMenu = ({ item, key }) => {
        const text = item.props.children.props.children;
        this.refs.relatedMenu.innerText = text;

        this.state.args.status = key;
        this.state.argsShow.status = text;
    }

    // 把搜索条件转换成数组
    getObjectValToArray = () => {

        const objectArgs = this.state.argsShow;
        let str = [];

        for (let i in objectArgs) {
            if (objectArgs[i] !== "" && i !== "page") {
                let tag = this.tagString(i);
                let tagObj = {
                    type: i,
                    label: tag,
                    value: objectArgs[i]
                }
                str.push(tagObj);
            }
        }

        return(
            <span>
                {
                    str?
                    str.map((item,index) => 
                        <span 
                            key ={`label-${index}`}
                            className={ styles.tag } 
                            onClick={this.closeTag.bind(this,item)}
                            >
                            { item.label } : { item.value } 
                            <Icon type="close" style={{marginLeft:5}} />
                        </span>

                    )
                    :null
                }
            </span>
        )
    }

    // 搜索参数显示名称替换
    tagString = (tag) => {

        let tagString = "";

        switch (tag) {
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

    /**
     * 关闭标签,并重新搜索
     * @param  {type} item [标签信息]
     */
    closeTag = (item) => {

        switch(item.type){
            case 'sku':
                this.state.args.sku = '';
                this.state.argsShow.sku = '';
                document.getElementById('sku').value = '';
                break;
            case 'price1':
                this.state.args.price1 = '';
                this.state.argsShow.price1 = '';
                this.state.args.price2 = '';
                this.state.argsShow.price2 = '';
                document.getElementById('price1').value = '';
                document.getElementById('price2').value = '';
                break;
            case 'price2':
                this.state.args.price1 = '';
                this.state.argsShow.price1 = '';
                this.state.args.price2 = '';
                this.state.argsShow.price2 = '';
                document.getElementById('price1').value = '';
                document.getElementById('price2').value = '';
                break;
            case 'site':
                this.state.args.site = '';
                this.state.argsShow.site = '';
                break;
            case 'cid':
                this.state.args.cid = '';
                this.state.argsShow.cid = '';
                break;
            case 'bid':
                this.state.args.bid = '';
                this.state.argsShow.bid = '';
                break;
            case 'status':
                this.state.args.status = '';
                this.state.argsShow.status = '';
                break;
        }

        
        this.setState({status:1});

        // 开始搜索
        this.props.handleSearchArgs(this.state.args); 
    }
    
    // 根据时间搜索
    getTime = (date, dateString) => {

        if(dateString[0]){
            this.state.args.startTime = dateString[0];
            this.state.args.endTime = dateString[1];

            console.log(this.state.args);
            this.props.handleSearchArgs(this.state.args);
        }
    }
}


export default SearchBar;
