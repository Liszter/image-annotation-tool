/*
 * @Author: liszter <liszter@qq.com>
 * @Date: 2023-10-17 10:37:43
 * @LastEditTime: 2023-10-18 17:30:43
 * @LastEditors: lishutao
 * @Description: 暂无
 * @FilePath: \image-annotation-tool\src\main.tsx
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "@arco-design/web-react/dist/css/arco.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
