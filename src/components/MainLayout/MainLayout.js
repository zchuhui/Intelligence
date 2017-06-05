import React, { Component } from 'react';
import { Layout } from 'antd';
import styles from './MainLayout.less';
import Header from '../../components/Header/Header';
import Menus from '../../components/Menu/Menu';


class MainLayout extends Component {

    render() {
        return (
            <div className={styles.wrapper}>
            <Header location={ this.props.location } />
            
            <div className={styles.contentWrap}>
              <div className={styles.mainWrap}>
                <Menus />
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
