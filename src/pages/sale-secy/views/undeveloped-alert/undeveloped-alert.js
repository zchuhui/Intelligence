import React from 'react';
import { Modal } from 'antd';

/**
 * 销售秘书导航
 * detai: 根据回传的值，判断选中哪个
 */
class UndevelopedAlert extends React.Component{

    render(){
        return(
            <div onClick={this.warning} style={{cursor:'pointer'}}>{this.props.text}</div>
        )
    }

    warning =() =>{
        Modal.warning({
          title: '温馨提示',
          content: '玩命开发中...',
          okText:'知道了',
        });
    }
}

export default UndevelopedAlert;

