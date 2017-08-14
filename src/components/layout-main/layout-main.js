import React from "react";
import styles from "./layout-main.less";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import LocalStorage from "../../utils/local-storage";

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
          location={this.props.location}
          headerMenuText={this.props.headerMenuText}
          userPermission={this.props.userPermission}
        />
        {/*内容区*/}
        <div className={styles.contentWrap}>
          {/* <div className={styles.mainWrap}> */}
            {this.props.children}
          {/* </div> */}
        </div>

        {/*底部组件*/}
        <Footer />
      </div>
    );
  }
}

export default MainLayout;
