/*
 * @Author: liszter <liszter@qq.com>
 * @Date: 2023-10-23 11:07:57
 * @LastEditTime: 2023-10-23 11:08:06
 * @LastEditors: lishutao
 * @Description: 暂无
 * @FilePath: \image-annotation-tool\src\store\store.js
 */
import { createStore } from 'redux';
import rootReducer from './reducers'; // 导入根reducer

const store = createStore(rootReducer); // 创建store

export default store;