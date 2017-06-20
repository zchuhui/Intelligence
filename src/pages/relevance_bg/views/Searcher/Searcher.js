/**
 * BG搜索模块
 * Date: 2017/6/19
 * Author: zhuangchuhui
 */

import React from 'react';
import styles from './Searcher.less'
import moment from 'moment';
import { Menu, Dropdown, Button, Icon, DatePicker, Input, InputNumber, Select, Tag, Cascader } from 'antd';

const { MonthPicker, RangePicker } = DatePicker;
const SubMenu = Menu.SubMenu;
const InputGroup = Input.Group;


class Searcher extends React.Component {
    constructor(props, context) {
        super(props, context);

        // 搜索条件
        this.state = {
            // value
            args: {
                site: '',
                cid: '',
                bid: '',
                status: '',
                sku: '',
                price1: '',
                price2: '',
                startTime:'',
                endTime:'',
                page: 1,
            },
            // label
            argsShow: {
                site: '',
                cid: '',
                bid: '',
                status: '',
                sku: '',
                price1: '',
                price2: '',
            }
        }
    }

    /**
     * 搜索
     */
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


        // 开始搜索
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
            this.state.argsShow.cid = selectedOptions[len - 1].label;
        }


        //this.props.getMenuBrands(this.state.args.site);   

    }

    /**
     * 把搜索条件转换成数组
     * @return {[array]} [字符串数组]
     */
    getObjectValToArray = () => {

        const objectArgs = this.state.argsShow;

        let str = [];
        for (let i in objectArgs) {
            if (objectArgs[i] !== "" && i !== "page") {
                let tag = this.tagString(i);
                let tagObj = {
                    cid: i,
                    label: tag,
                    value: objectArgs[i]
                }
                //str.push(`${tag}:  ${objectArgs[i]}`);
                str.push(tagObj);
            }
        }

        console.log(str)

        return str;
    }

    /**
     * 搜索参数显示名称替换
     * @param  {[type]} tag [id]
     * @return {[string]}     [显示名称]
     */
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
     * 获取关联状态
     */
    getStatus = (value) => {

        this.state.args.status = value;

        if (value == 1) {
            this.state.argsShow.status = "已关联";
        } else {
            this.state.argsShow.status = "未关联";
        }
    }

    // 关闭标签
    closeTag = (e) => {
        console.log(e);
    }

    // 根据时间搜索
    getTime = (date, dateString) => {

        if(dateString[0]){
            this.state.args.startTime = dateString[0];
            this.state.args.endTime = dateString[1];

            this.props.handleSearchArgs(this.state.args);
        }

    }


    render() {
        return (
            <div className={ styles.searchWrap}>
                <div className={ styles.searchArgs }>
                    <span>筛选范围 <Icon type="right" className={styles.iconRight}/> </span>
                    <span id="tagList"></span>
                    { 
                        this.getObjectValToArray().map((item,index) => 
                            <span 

                                key={item.cid} 
                                className={ styles.tag } 
                                onClick={this.closeTag.bind(this)}
                                >
                                {item.label} : { item.value } 
                            </span>)
                            
                    }
                </div>
                <div className={ styles.main }>
                    <div className={ styles.title }>
                        <span>筛选分类</span>
                    </div>

                    {/*搜索栏 start*/}
                    <div className={ styles.searchContent}>
                        <div className={ styles.searchLeft }>

                            <Cascader 
                                options={ this.props.menus.cate } 
                                placeholder="分类" 
                                onChange={ this.handleCateMenu } 
                                changeOnSelect 
                                allowClear={false}
                                style={{ marginRight:10, width:300, marginBottom:10}}
                            />
                            
                            <Select
                                showSearch
                                style={{ width: 200, marginRight:10, verticalAlign:'top'}}
                                placeholder="品牌"
                                optionFilterProp="children"
                                >

                                {
                                    this.props.menus.brand.map((i,index) => <Option key={i.bid}>{i.bname}</Option>)
                                }
                            </Select>

                            <Select
                                style={{ width: 200, marginRight:10, verticalAlign:'top'}}
                                placeholder="关注状态" 
                                onChange={ this.getStatus }
                                >
                                <Option key="1">已关联</Option>
                                <Option key="2">未关联</Option>
                            </Select>

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
                                    ranges={{ 今天: [moment(), moment()],
                                    '本周': [moment(), moment().endOf('week')], 
                                    '本月': [moment(), moment().endOf('month')] }}
                                    format="YYYY-MM-DD" 
                                    style={{ width:240 }}
                                    onChange={ this.getTime }
                                    allowClear="true"
                                />
                            </div>
                            
                        </div>
                        <div className={ styles.searchRight }>
                            <Button type="primary" style={{ width: 150 }} onClick={ this.handlerSearchClick.bind(this) }>搜索</Button>
                        </div>
                    </div>
                    {/*搜索栏 end*/}

                </div>

            </div>
        )
    }
}


export default Searcher;
