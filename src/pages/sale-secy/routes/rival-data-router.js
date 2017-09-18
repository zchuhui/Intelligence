import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../../components/layout-main/layout-main';
import MenuBar from '../views/menu-bar/menu-bar';
import RivalNew from '../views/rival/rival-new';
import DateTime from '../../../utils/date-time'; 

class RivalDataRouter extends React.Component {

    render(){
        return (
            <MainLayout headerMenuText="销售秘书">
                {/* 菜单 */}
                <MenuBar value={2}/>

                <RivalNew 
                    loading={this.props.loading}
                    rivalData={this.props.rivalData}
                    getRivalDataByDate = {params => this.getRivalDataByDate(params)}
                />
                
            </MainLayout>
        )
    }

    /**
     * 根据时间获取竞品数据
     * @param {date} startDate 
     * @param {date} endDate 
     */
    getRivalDataByDate(params){
        // 根据时间请求数据
        this.props.dispatch({
            type: 'RivalModel/getRivalDataByDate',
            payload: {
                startDate:params.startDate,
                endDate:params.endDate
            }
        })
    }
    
    componentDidMount(){
        // 根据时间请求数据
        this.props.dispatch({
            type: 'RivalModel/getRivalDataByDate',
            payload: {
                startDate:DateTime.getDateOfDays(7),
                endDate:DateTime.getDateOfDays(1),
            }
        })

    }   
}


function mapStateToProps(state){
    return {...state.RivalModel};
}

export default connect(mapStateToProps)(RivalDataRouter)