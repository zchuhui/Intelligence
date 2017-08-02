import React from 'react';
import styles from './layout-main.less';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import LocalStorage from '../../utils/local-storage';

/*布局组件*/
class MainLayout extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className={styles.wrapper}>

                {/*头部组件*/}
                <Header 
                    location={ this.props.location } 
                    headerMenuText={this.props.headerMenuText}
                    />
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
}

export default MainLayout;
