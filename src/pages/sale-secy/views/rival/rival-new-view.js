/**
 * 商品详情模块
 * Date: 2017/8/18
 * Author: zhuangchuhui
 */

import React from 'react';
import styles from './rival-new.less'
import moment from 'moment';
import echarts from 'echarts';
import { Button, DatePicker, Spin, Select, Input, Table, Pagination, Popover, message} from 'antd';
import { Link } from 'dva/router';
import DateTime from '../../../../utils/date-time'; 
import Clipboard  from 'clipboard';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option,
      InputGroup = Input.Group;
    
const clipboard  = new Clipboard('.copyUrl');


class RivalNewView extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            site:'gearbest',                        // 站点
            startDate: DateTime.getDateOfDays(7),   // 起始时间
            endDate: DateTime.getDateOfDays(1),     // 结束时间
            bid:null,                               // 品牌Id
            status:null,                            // 关联状态
            url:null,
        }
    }
    
    render() {

        const columns = [
            { title: '商品', dataIndex: 'img_url', width:'10%',render:(text,record)=>(<div>
                <p><img className={styles.productImg} src={record.img_url} /></p>
                <Button 
                    type="primary" size="small" 
                    className='copyUrl' 
                    data-clipboard-text={record.product_url}
                    onClick={this.onCopyUrl.bind(this)}
                >复制链接</Button>
            </div>)},
            { title: '竞争平台', dataIndex: 'site', width:'10%'},
            { title: '标题', dataIndex: 'pname', width:'15%',render:(text,record)=>(
            <div>
                <p style={{maxWidth:300}}> {record.pname}</p>
                {/* <div>
                    <span className={styles.relatedY}></span>
                    <span className={styles.relatedN}></span>
                    <span className={styles.traceY}></span>
                    <span className={styles.traceN}></span>
                </div> */}
            </div>
            )},
            { title: '价格', dataIndex: 'price', width:'7%',render:(text,record)=>(
                <div>
                    {
                        record.poa.length >0?
                        <Popover content={ 
                            record.poa.map((item,index)=>
                            <p key={index}>
                                {item.name} :  ${ item.value }
                            </p>)
                        }
                        trigger="hover">
                        <span>$ {record.price}</span>
                    </Popover>
                    :<p>$ {record.price}</p>
                    }
                </div>
            )},
            { title: '上新时间', dataIndex: 'add_time', width:'8%'},
            { title: '评论数', dataIndex: 'reviews', width:'7%'},
            { title: '关注数', dataIndex: 'favorites', width:'7%'},
            { title: '提问数', dataIndex: 'questions', width:'6%'},
            { title: '分类', dataIndex: 'cateName', width:'10%',
            render:(text,record) => (
                <div className={styles.cateName} title={record.cateName}>
                {
                    record.cateName?
                    record.cateName.split('>').map((item,index) => <p key={index}>{item}</p>)
                    :
                    record.cateName
                }
                </div>
            )
            },
            { title: '品牌', dataIndex: 'bname', width:'10%'},
            { title: '操作', width:'10%',render:(text,record) => (<div><Button type="primary">采购</Button></div>)},
        ];
        

        return (
            <div className={`${styles.mainWrap} ${styles.rivalWrap}`}>
                {/* 导航栏 */}
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
                        <Select 
                            defaultValue={this.props.params.site} 
                            className={styles.mr10} 
                            onChange={this.onSelectSite.bind(this)}
                            style={{ width: 120}}
                        >
                            <Option value="gearbest">gearbest</Option>
                            <Option value="lightinthebox">lightinthebox</Option>
                            <Option value="dx">dx</Option>
                            <Option value="tomtop">tomtop</Option>
                        </Select>
                        <Select
                            showSearch
                            style={{ width: 120}}
                            className={styles.mr10}
                            placeholder="品牌"
                            optionFilterProp="children"
                            labelInValue  
                            allowClear  
                            onChange={this.onSelectBid.bind(this)}
                            >
                            {
                                this.props.menus.brand?
                                this.props.menus.brand.map((i,index) => <Option key={index} value={i.bid}>{i.bname}</Option>)
                                :null
                            }
                        </Select>
                        <Select defaultValue="关联状态" onChange={this.onSelectStatus.bind(this)} className={styles.mr10}>
                            <Option value="0">全部</Option>
                            <Option value="1">已关联</Option>
                            <Option value="2">未关联</Option>
                        </Select>
                        {/* <Select defaultValue="追踪状态" className={styles.mr10}>
                            <Option value="0">全部</Option>
                            <Option value="1">已追踪</Option>
                            <Option value="2">未追踪</Option>
                        </Select> */}
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
                        <Input placeholder="URL" style={{width:300}} className={styles.mr10} id="txtUrlId" onChange={this.onInputUrl.bind(this)} />
                        <Button type="primary" onClick={this.search.bind(this)}>搜索</Button>
                    </div>
                    
                    <div className={styles.tableWrap}>
                        <Table
                            loading={ this.props.rivalViewLoading } 
                            columns={columns}
                            dataSource={this.props.rivalViewList !==null?this.props.rivalViewList.list:null}
                            pagination={false}
                        />
                        
                        <div className={styles.piginationWrap}>
                            {
                                this.props.rivalViewList !==null?
                                <Pagination
                                    className="ant-table-pagination"
                                    total={parseInt(this.props.rivalViewList.page.count)} 
                                    current={this.props.rivalViewList.page.page}
                                    pageSize={this.props.rivalViewList.page.pageSize}
                                    onChange={this.changePagination.bind(this)}
                                />
                                :null
                            }
                        </div>
                    </div>

                </div>
            </div>
        );
        
    }

    /**
     * 选择站点
     * @param {string} value 
     */
    onSelectSite(value){
        this.setState({
            site:value,
        })
    }

    /**
     * 选择品牌
     * @param {number} value 
     */
    onSelectBid(value){
        if(value !== undefined){
            this.setState({
                bid:value.key,
            })
        }else{
            this.setState({
                bid:null
            })
        }
    }

    /**
     * 选择关联状态
     * @param {number} value 
     */
    onSelectStatus(value){
        this.setState({
            status:value,
        })
    }

    /**
     * url文本取值
     */
    onInputUrl(){
        const val = document.getElementById('txtUrlId').value;
        this.setState({
            url:val
        })
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

    /**
     * 复制产品url的提醒
     * @param {string} url 
     */
    onCopyUrl(url){
        message.destroy();
        message.warning("复制成功！");
    }

    /**
     * 搜索
     */
    search(){
        let params = {
            site:this.state.site,
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            page:1,
        }

        if(this.state.bid !== null){
            params.bid = this.state.bid;
        }
        if(this.state.status !== null){
            params.status = this.state.status;
        }
        if(this.state.url !== null){
            params.url = this.state.url;
        }

        this.props.getRivalDataByParams(params)
    }


    /**
     * 
     * @param {number} currentPage
     */
    changePagination(currentPage){

        let params = {
            site:this.state.site,
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            page:currentPage
        }

        if(this.state.bid !== null){
            params.bid = this.state.bid;
        }
        if(this.state.status !== null){
            params.status = this.state.status;
        }

        this.props.getRivalDataByParams(params);
    }


    componentDidMount(){

        // 获取
        if(this.props.params){
            
            this.setState({
                site:this.props.params.site,
                startDate:this.props.params.startDate,
                endDate:this.props.params.endDate
            })

            // 首次搜索
            this.props.getRivalDataByParams({
                site:this.props.params.site,
                startDate:this.props.params.startDate,
                endDate:this.props.params.endDate
            })
        }

    }

    componentDidUpdate(){
    }

}

export default RivalNewView;
