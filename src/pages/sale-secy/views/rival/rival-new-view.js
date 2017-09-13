/**
 * 商品详情模块
 * Date: 2017/8/18
 * Author: zhuangchuhui
 */

import React from 'react';
import styles from './rival-new.less'
import moment from 'moment';
import echarts from 'echarts';
import { Button, DatePicker, Spin, Select, Input, Table, Popover} from 'antd';
import { Link } from 'dva/router';
import DateTime from '../../../../utils/date-time'; 

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option,
      InputGroup = Input.Group;

class RivalNewView extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            startDate: DateTime.getDateOfDays(7),
            endDate: DateTime.getDateOfDays(1),
        }
    }
    
    render() {

        const columns = [
            { title: '商品', dataIndex: 'img', width:'10%',render:(text,record)=>(<div>
                <p><img className={styles.productImg} src={record.img} /></p>
                <Button type="primary" size="small">复制链接</Button>
            </div>)},
            { title: '竞争平台', dataIndex: 'rival', width:'10%'},
            { title: '标题', dataIndex: 'title', width:'15%',render:(text,record)=>(
            <div>
                <p style={{maxWidth:300}}> {record.title}</p>
                <div>
                    <span className={styles.relatedY}></span>
                    <span className={styles.relatedN}></span>
                    <span className={styles.traceY}></span>
                    <span className={styles.traceN}></span>
                </div>
            </div>
            )},
            { title: '价格', dataIndex: 'price', width:'7%',render:(text,record)=>(
                
                <div>
                    <Popover content={ 
                        <div>
                            <p>111111</p>
                            <p>111111</p>
                            <p>111111</p>
                        </div>
                        }
                        trigger="hover">
                        <span>{record.price}</span>
                    </Popover>
                    
                </div>
            )},
            { title: '上新时间', dataIndex: 'time', width:'8%'},
            { title: '评论数', dataIndex: 'views', width:'7%'},
            { title: '关注数', dataIndex: 'favious', width:'7%'},
            { title: '提问数', dataIndex: 'questions', width:'6%'},
            { title: '分类', dataIndex: 'cates', width:'10%'},
            { title: '品牌', dataIndex: 'pp', width:'10%'},
            { title: '操作', dataIndex: 'opt', width:'10%',render:(text,record) => (<div><Button type="primary">采购</Button></div>)},
        ];
        
        const dataSource = [{
                    key: '1',
                    img:'http://lorempixel.com/640/480/people',
                    rival: 'DX',
                    title: 'Mens Summer Cotton Color V-neck Short Sleeve Casual T-shirt Short Sleeve Casual T-shirt',
                    price: '$454',
                    time:'2015-02-05',
                    views:'323',
                    favious:'22',
                    questions:'33',
                    cates:'分类1',
                    pp:'MM'
                }, {
                    key: '2',
                    img:'http://lorempixel.com/640/480/people',
                    rival: 'DXXX',
                    title: 'Mens Summer Cotton Color V-neck Short Sleeve Casual T-shirt Short Sleeve Casual T-shirt',
                    price: '$454',
                    time:'2015-02-05',
                    views:'323',
                    favious:'22',
                    questions:'33',
                    cates:'分类1',
                    pp:'MM'
                }];
        
        return (
            <div className={`${styles.mainWrap} ${styles.rivalWrap}`}>
                <div className={styles.menu}>
                    <ul>
                        <li className={styles.current}>竞品新品</li>
                        <li>竞品热销</li>
                        <li>竞品波动</li>
                        <li>竞品评论</li>
                    </ul>
                </div>
                <div className={`${styles.content} ${styles.rivalNewView}`}>
                    {/* 搜索栏 */}
                    <div className={styles.searchBar}>
                        <Select defaultValue="竞品平台-分类" className={styles.mr10}>
                            <Option value="0">分类1</Option>
                            <Option value="1">分类2</Option>
                        </Select>
                        <Select defaultValue="品牌" className={styles.mr10}>
                            <Option value="0">分类1</Option>
                            <Option value="1">分类2</Option>
                        </Select>
                        <Select defaultValue="被追踪" className={styles.mr10}>
                            <Option value="0">分类1</Option>
                            <Option value="1">分类2</Option>
                        </Select>
                        <Select defaultValue="被追踪" className={styles.mr10}>
                            <Option value="0">分类1</Option>
                            <Option value="1">分类2</Option>
                        </Select>
                        <InputGroup compact style={{width:300,display:'inline-block',verticalAlign:'top'}}>
                            <Button>上新时间</Button>
                            <RangePicker 
                                value={[
                                    moment(this.state.startDate),
                                    moment(this.state.endDate)
                                ]}
                                ranges={{ 
                                    '今天': [moment(), moment()],
                                    '本周': [moment(), moment().endOf('week')], 
                                    '本月': [moment(), moment().endOf('month')] 
                                }} 
                                format="YYYY-MM-DD" 
                                style={{ width:210 }}
                                allowClear={false}
                                disabledDate = {this.disabledDate}
                                onChange={ this.onGetDateRange.bind(this) }
                            />
                        </InputGroup>
                        <Input placeholder="URL" style={{width:300}} className={styles.mr10} />
                        <Button type="primary">搜索</Button>
                    </div>
                    
                    <div className={styles.tableWrap}>
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={false}
                        />
                    </div>

                </div>
            </div>
        );
        
    }

    /**
     * 日期控件操作
     * @param {*} date 
     * @param {*} dateString 
     */
    onGetDateRange(date,dateString){
        // 获取日期并赋值到state
        let startDate = dateString[0],
            endDate   = dateString[1];
        // 赋值
        this.setState({startDate:startDate,endDate:endDate});
        

    }

    /**
     * 限制日期控件只能选今天或今天前的日期
     * @param {*} current 
     */
    disabledDate(current) {
        return current && current.valueOf() > Date.now();
    }


    componentDidMount(){
    }

    componentDidUpdate(){
    }

}

export default RivalNewView;
