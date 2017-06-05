import React from 'react';
import { connect } from 'dva';

function TestPage() {
    return (
        <div>
            this is test page.
        </div>
    );
}

TestPage.propTypes = {}

export default connect()(TestPage);
