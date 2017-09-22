/**
 * 竞品 Model
 * Date:2017-09-13
 * Author:zhuangchuhui
 */

import * as ServiceRival from '../../../services/service-rival';
import { CODE200, ERRORMESSAGE } from '../../../constants/constant';
import { message } from 'antd';

export default {
    namespace: 'RivalModel',
    
    state: {
        loading:true,
        rivalData:null,

        rivalViewLoading:true,
        rivalViewList:null,

        relatedLoading:false,
        relatedStatus:false,
    },

    reducers:{
        // 更新初始加载状态
		updateLoading(state,{ payload }){
			return {...state, loading: payload.loading}
        },
        // 更新初始加载状态
		updateRivalViewLoading(state,{ payload }){
			return {...state, rivalViewLoading: payload.loading}
        },

        // 存储图表数据
        saveRivalData(state,{ payload }){
            return {...state, rivalData:payload.data};
        },
        // 存储列表数据
        saveRivalViewList(state,{ payload }){
            return {...state, rivalViewList:payload.data};
        },

        // 更新关联的加载状态
        updateRelatedLoading(state,{payload}){
            return {...state,relatedLoading:payload}
        },

        // 更新关联状态
        updateRelatedStatus(state,{payload}){
            return {...state,relatedStatus:payload}
        }

    },

    effects:{
        // 获取竞品图表数据
		* getRivalDataByDate({payload},{select,call,put}){
			try{
                // 清空数据
                yield put({ type:'saveRivalData', payload:{data:null}});

				yield put({type:'updateLoading', payload:{loading:true}})
                
				// 请求获取数据
                const { data } = yield call(ServiceRival.getRivalDataByDate,payload);
               
				if(data){
					yield put({ type:'saveRivalData', payload:data});
				}
				
				yield put({type:'updateLoading', payload:{loading:false}})

			}catch(e){
				yield put({type:'updateLoading', payload:{loading:false}})
			}
        },
    
        // 获取竞品列表数据
		* getRivalDataByParams({payload},{select,call,put}){
            try{
                // 先清空数据
                yield put({ type:'saveRivalViewList', payload:{data:null}});
                
                yield put({type:'updateRivalViewLoading', payload:{loading:true}})
                
                // 请求获取数据
                const { data } = yield call(ServiceRival.getRivalDataByParams,payload);
                //const data = {"code":200,"msg":"\u83b7\u53d6\u6210\u529f","data":{"search":{"com":"products","t":"getProductsNewList","site":"gearbest","startDate":"2017-09-13","endDate":"2017-09-19","page":"5","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDU4NzA1MzEsIm5iZiI6MTUwNTg3MDUzMSwiZXhwIjoxNTA1OTU2OTMxLCJqdGkiOiIxMGMyNmVkNzg4YjM3ZDI1Y2JlMDNlYWI1MGViMzM5NiIsInVzZXIiOnsiYWRtaW5faWQiOiIyMzE1IiwiYWRtaW5fbmFtZSI6ImxhaXppamluZyIsInNqX2luZm8iOm51bGx9fQ.nh4pckNYoGbYYH1KxBaJzoB0nT_z8jb02BG52jZT0gU"},"page":{"page":5,"pageSize":10,"count":"10293","pageNum":1030},"list":[{"pid":"2094871","cid":"46779","bid":"0","bname":null,"aid":"0","sku":"21720970","atids":"28339","pname":"10pcs Baby Children Safety Lock","product_url":"https:\/\/www.gearbest.com\/baby-care\/pp_673949.html","img_url":"temp\/skin1\/images\/no_pic.jpg","url_id":"673949","add_time":"2017-09-17 07:55:44","price":"4.66","reviews":"0","questions":"0","favorites":"6","site":"gearbest","relate_sku":"SKU022568","cateName":"Baby & Kids > Baby Care","attrName":"","status":"1","poa":[]},{"pid":"2094869","cid":"47172","bid":"0","bname":null,"aid":"0","sku":"22144110","atids":"28340,30250,28341,28339","pname":"SENLAN 9005 Non-polarized Detachable PC Lens Glasses","product_url":"https:\/\/www.gearbest.com\/cycling-sunglasses\/pp_685008.html","img_url":"https:\/\/gloimg.gbtcdn.com\/gb\/pdm-product-pic\/Electronic\/2017\/08\/02\/goods-img\/1501636284179918549.JPG","url_id":"685008","add_time":"2017-09-17 07:55:27","price":"13.43","reviews":"0","questions":"0","favorites":"5","site":"gearbest","relate_sku":"SKU022568","cateName":"Outdoors & Sports > Cycling > Cycling Sunglasses > Baby & Kids > Baby Care","attrName":"","status":"1","poa":[{"name":"WHITE","value":"13.43"},{"name":"BLACK","value":"13.43"},{"name":"BLUE","value":"13.43"},{"name":"BLACK RED","value":"13.43"}]},{"pid":"2094868","cid":"48213","bid":"0","bname":null,"aid":"0","sku":"21991450","atids":"28342","pname":"Lavender Landscape PVC Print Abstract Wall Decor","product_url":"https:\/\/www.gearbest.com\/wall-stickers\/pp_677278.html","img_url":"https:\/\/gloimg.gbtcdn.com\/gb\/pdm-product-pic\/Electronic\/2017\/07\/25\/goods-img\/1500955585620756734.jpg","url_id":"677278","add_time":"2017-09-17 07:55:10","price":"7.33","reviews":"0","questions":"0","favorites":"2","site":"gearbest","relate_sku":"SKU022568","cateName":"Home & Garden > Home Decors > Wall Art > Wall Stickers > Outdoors & Sports > Cycling > Cycling Sunglasses > Baby & Kids > Baby Care","attrName":"","status":"1","poa":[]},{"pid":"2094867","cid":"48250","bid":"0","bname":null,"aid":"0","sku":"21969620","atids":"28603","pname":"Windbell Design Case for Samsung Galaxy Tab A T550 \/ T555","product_url":"https:\/\/www.gearbest.com\/tablet-accessories\/pp_671080.html","img_url":"https:\/\/gloimg.gbtcdn.com\/gb\/pdm-product-pic\/Maiyang\/2017\/07\/18\/goods-img\/1500610446212134523.jpg","url_id":"671080","add_time":"2017-09-17 07:55:03","price":"12.09","reviews":"0","questions":"0","favorites":"2","site":"gearbest","relate_sku":"SKU022568","cateName":"Tablet PC & Accessories > Tablet Accessories > Home & Garden > Home Decors > Wall Art > Wall Stickers > Outdoors & Sports > Cycling > Cycling Sunglasses > Baby & Kids > Baby Care","attrName":"","status":"1","poa":[]},{"pid":"2094866","cid":"43335","bid":"0","bname":null,"aid":"0","sku":"21739530","atids":"30303,28368","pname":"Retro Dial Zinc Alloy ADHD EDC Fidget Spinner","product_url":"https:\/\/www.gearbest.com\/fidget-spinners\/pp_674652.html","img_url":"https:\/\/gloimg.gbtcdn.com\/gb\/pdm-product-pic\/Electronic\/2017\/07\/22\/goods-img\/1500696206149339629.jpg","url_id":"674652","add_time":"2017-09-17 07:55:01","price":"5.61","reviews":"0","questions":"0","favorites":"7","site":"gearbest","relate_sku":"0","cateName":"Toys & Hobbies > Stress & Fidget Toys > Fidget Spinners > Tablet PC & Accessories > Tablet Accessories > Home & Garden > Home Decors > Wall Art > Wall Stickers > Outdoors & Sports > Cycling > Cycling Sunglasses > Baby & Kids > Baby Care","attrName":"","status":"0","poa":[{"name":"GOLDEN","value":"5.61"},{"name":"COPPER","value":"5.61"}]},{"pid":"2094865","cid":"44184","bid":"0","bname":null,"aid":"0","sku":"22251540","atids":"28603","pname":"Cartoon Painted Relief Phone Cover for OPPO R11","product_url":"https:\/\/www.gearbest.com\/cases-leather\/pp_699723.html","img_url":"https:\/\/gloimg.gbtcdn.com\/gb\/pdm-product-pic\/Maiyang\/2017\/08\/08\/goods-img\/1502737557759715688.jpg","url_id":"699723","add_time":"2017-09-17 07:54:57","price":"4.99","reviews":"0","questions":"0","favorites":"1","site":"gearbest","relate_sku":"0","cateName":"Mobile Phones > Cell Phone Accessories > Cases & Leather > Toys & Hobbies > Stress & Fidget Toys > Fidget Spinners > Tablet PC & Accessories > Tablet Accessories > Home & Garden > Home Decors > Wall Art > Wall Stickers > Outdoors & Sports > Cycling > Cycling Sunglasses > Baby & Kids > Baby Care","attrName":"","status":"0","poa":[]},{"pid":"2094864","cid":"47305","bid":"0","bname":null,"aid":"0","sku":"22729620","atids":"28340","pname":"Xld Cold-Pressed Turbo Diamond Saw Blade Grade A for Building Materials 230 x 2.6 x 7 x 22.23","product_url":"https:\/\/www.gearbest.com\/garden-decking\/pp_779869.html","img_url":"https:\/\/gloimg.gbtcdn.com\/gb\/pdm-provider-img\/straight-product-img\/20170906\/T008633\/T0086330071\/goods-img\/1504919327370655775.jpg","url_id":"779869","add_time":"2017-09-17 07:54:54","price":"26.01","reviews":"0","questions":"0","favorites":"1","site":"gearbest","relate_sku":"SKU004149","cateName":"Home & Garden > Garden Supplies > Garden Decking > Mobile Phones > Cell Phone Accessories > Cases & Leather > Toys & Hobbies > Stress & Fidget Toys > Fidget Spinners > Tablet PC & Accessories > Tablet Accessories > Home & Garden > Home Decors > Wall Art > Wall Stickers > Outdoors & Sports > Cycling > Cycling Sunglasses > Baby & Kids > Baby Care","attrName":"","status":"1","poa":[]},{"pid":"2094862","cid":"44184","bid":"0","bname":null,"aid":"0","sku":"22510570","atids":"28340,99568,99570,28344,28342,99569,127708,30319","pname":"Wkae Grind Arenaceous PU Leather Flip Stand Case with Wallet and Three Card Slots for HUAWEI P10 Lite","product_url":"https:\/\/www.gearbest.com\/cases-leather\/pp_723337.html","img_url":"https:\/\/gloimg.gbtcdn.com\/gb\/pdm-provider-img\/straight-product-img\/20170824\/T008972\/T0089720391\/goods-img\/1503626767529551637.jpg","url_id":"723337","add_time":"2017-09-17 07:54:33","price":"6.93","reviews":"0","questions":"0","favorites":"3","site":"gearbest","relate_sku":"0","cateName":"Mobile Phones > Cell Phone Accessories > Cases & Leather > Home & Garden > Garden Supplies > Garden Decking > Mobile Phones > Cell Phone Accessories > Cases & Leather > Toys & Hobbies > Stress & Fidget Toys > Fidget Spinners > Tablet PC & Accessories > Tablet Accessories > Home & Garden > Home Decors > Wall Art > Wall Stickers > Outdoors & Sports > Cycling > Cycling Sunglasses > Baby & Kids > Baby Care","attrName":"","status":"0","poa":[{"name":"TEA COLORED","value":"6.93"},{"name":"BLACK","value":"6.93"},{"name":"PURPLE","value":"6.93"},{"name":"GRAY","value":"6.93"},{"name":"TURQUOISE","value":"6.93"},{"name":"DARK GREY","value":"6.93"},{"name":"SEA BLUE","value":"6.93"},{"name":"GRAPE PURPLE","value":"6.93"}]},{"pid":"2094861","cid":"47081","bid":"0","bname":null,"aid":"0","sku":"18517820","atids":"28347,98249","pname":"Turn-Down Collar Splicing Design Checked Long Sleeve Polo T-Shirt For Men","product_url":"https:\/\/www.gearbest.com\/men-s-long-sleeves-tees\/pp_417360.html","img_url":"https:\/\/gloimg.gbtcdn.com\/gb\/pdm-product-pic\/Clothing\/2016\/06\/16\/goods-img\/1469578290163381488.jpg","url_id":"417360","add_time":"2017-09-17 07:54:30","price":"14.27","reviews":"0","questions":"0","favorites":"37","site":"gearbest","relate_sku":"SKU004149","cateName":"Apparel > Men's Clothing > Men's T-shirts > Men's Long Sleeves Tees > Mobile Phones > Cell Phone Accessories > Cases & Leather > Home & Garden > Garden Supplies > Garden Decking > Mobile Phones > Cell Phone Accessories > Cases & Leather > Toys & Hobbies > Stress & Fidget Toys > Fidget Spinners > Tablet PC & Accessories > Tablet Accessories > Home & Garden > Home Decors > Wall Art > Wall Stickers > Outdoors & Sports > Cycling > Cycling Sunglasses > Baby & Kids > Baby Care","attrName":"","status":"1","poa":[{"name":"L","value":"14.27"}]},{"pid":"2094859","cid":"47139","bid":"0","bname":null,"aid":"0","sku":"20217750","atids":"28448,28347","pname":"Lenovo YOGA 4 Pro Intel Core i5 6200U Laptop","product_url":"https:\/\/www.gearbest.com\/computers\/pp_575472.html","img_url":"https:\/\/gloimg.gbtcdn.com\/gb\/pdm-product-pic\/Electronic\/2017\/03\/28\/goods-img\/1490667306063630068.jpg","url_id":"575472","add_time":"2017-09-17 07:54:26","price":"1604.93","reviews":"0","questions":"0","favorites":"9","site":"gearbest","relate_sku":"0","cateName":"Tablet PC & Accessories > Computers > Laptops > Apparel > Men's Clothing > Men's T-shirts > Men's Long Sleeves Tees > Mobile Phones > Cell Phone Accessories > Cases & Leather > Home & Garden > Garden Supplies > Garden Decking > Mobile Phones > Cell Phone Accessories > Cases & Leather > Toys & Hobbies > Stress & Fidget Toys > Fidget Spinners > Tablet PC & Accessories > Tablet Accessories > Home & Garden > Home Decors > Wall Art > Wall Stickers > Outdoors & Sports > Cycling > Cycling Sunglasses > Baby & Kids > Baby Care","attrName":"","status":"0","poa":[{"name":"SILVER","value":"1604.93"},{"name":"CHAMPAGNE","value":"1604.93"}]}]},"userInfo":{"admin_id":"2315","admin_name":"laizijing","sj_info":null}};
                if(data){
                    yield put({ type:'saveRivalViewList', payload:data});
                }
                yield put({type:'updateRivalViewLoading', payload:{loading:false}})
            
            }catch(e){
                yield put({type:'updateRivalViewLoading', payload:{loading:false}})

                message.destroy();
                message.warning(ERRORMESSAGE);
            }
        },

        // 关联商品
		* setRelatedBgBySku({payload},{select,call,put}){

            yield put({ type:'updateRelatedLoading', payload:true});

			try{
				// 请求获取数据
                const {data} = yield call(ServiceRival.setRelatedBgBySku,payload);
               
				if(data.code == CODE200){
                    message.success(data.msg)
                    yield put({ type:'updateRelatedStatus', payload:true});
				}else{
                    message.warning(data.msg)
                    yield put({ type:'updateRelatedStatus', payload:false});
                }
			}catch(e){
                yield put({ type:'updateRelatedStatus', payload:false});
            }
            
            yield put({ type:'updateRelatedLoading', payload:false});
        },

    },

    subscriptions:{

    }

}