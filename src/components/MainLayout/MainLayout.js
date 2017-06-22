import React from 'react';
import styles from './MainLayout.less';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import localStorage from '../../utils/localStorage';

/*布局组件*/
class MainLayout extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className={styles.wrapper}>

                {/*头部组件*/}
                <Header location={ this.props.location } />
                
                <div className={styles.contentWrap}>
                  <div className={styles.mainWrap}>
                    <div className={styles.mainHeader}>
                      
                      {/*搜索组件*/}
                      {/*<Searcher { ...this.props} /> */}
                      {/*父组件传过来的数据，可以通过...this.props传给子组件，如上*/}
                      {/*父组件穿过来的数据：<div>{this.props.searchArguments}</div>*/}
                    </div>
                    <div>
                      {/*内容区*/}
                      {this.props.children}
                    </div>
                  </div>
                </div>

                {/*底部组件*/}
                <Footer />
          </div>
        );
    }

    componentDidMount() {

        // 获取登录信息,如果为登录，则转到登录页面
        let loginStatus = localStorage.get('loginStatus');
        if (!loginStatus) {
            window.location.href = "/login"; 
        }

    }


}

export default MainLayout;
