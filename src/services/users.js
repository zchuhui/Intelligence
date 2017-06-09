import request from '../utils/request';
import { PAGE_SIZE } from '../constants/constant';

// users表数据操作
// 获取数据
export function fetch({ page }) {
  return request(`/test/users?_page=${page}&_limit=${PAGE_SIZE}`);
}

// 删除
export function remove(id){
	return request(`/test/users/${id}`,{
		method: 'DELETE',
	});
}

// 编辑
export function patch(id,values){
	return request(`/test/users/${id}`,{
		method: 'PATCH',
		body: JSON.stringify(values),
	});
}


