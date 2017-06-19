/**
 * BG搜索模块
 * Date: 2017/6/19
 * Author: zhuangchuhui
 */

import React from 'react';
import styles from './Searcher.less'
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


        // 开始搜索
        this.props.handleSearchArgs(this.state.args);

    }

    
	render(){
		return (
			<div className={ styles.searchWrap}>
                <div className={ styles.searchArgs }>
                    <span>筛选范围 <Icon type="right" className={styles.iconRight}/> </span>
                    
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
                                    /*this.props.menus.brand.map((i,index) => <Option key={i.bid}>{i.bname}</Option>)*/
                                }
                            </Select>

                            {/*<Dropdown overlay={ relatedMenu } trigger={['click']}>
                                <Button style={{ marginRight:10, marginBottom:10 ,verticalAlign:'top'}}> 
                                    <span ref="relatedMenu">关联状态</span>
                                    <Icon type="down" />
                                </Button>
                            </Dropdown>*/}

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