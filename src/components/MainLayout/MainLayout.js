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
            
            <div className={styles.content}>
              <div className={styles.main}>
                <Menus />
                <Searcher /> 
                {this.props.children}
              </div>
            </div>
          </div>
        );
    }
}

export default MainLayout;
