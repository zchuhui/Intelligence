import React, { Component } from 'react';
import { Layout } from 'antd';
import styles from './MainLayout.less';
import Header from '../../components/Header/Header';
import Menus from '../../components/Menu/Menu';
import Searcher from '../../components/Searcher/Searcher';


class MainLayout extends Component {

    render() {
        return (
            <div className={styles.wrapper}>
            <Header location={ this.props.location } />
            
            <div className={styles.contentWrap}>
              <div className={styles.mainWrap}>
                <div className={styles.mainHeader}>
                  <Menus />
                  <Searcher /> 
                </div>

                <div>
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default MainLayout;
