import request from '../utils/request';
import { PAGE_SIZE } from '../constants/constant';

// 获取数据
export function fetch({ page }) {
  	return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
