
import moment from 'moment';
import { DATE_FORMAT } from '../constants/constant';

export default {

    /**
     * 获取多少天前的日期
     * getDateOfDays(7) 表示7天前的日期
     */
    getDateOfDays: (days) => {
        const date = moment(new Date()).subtract(days,"days").format(DATE_FORMAT);
        return date;
    }

}