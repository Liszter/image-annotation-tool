/*
 * @Author: liszter <liszter@qq.com>
 * @Date: 2023-10-18 16:34:25
 * @LastEditTime: 2023-10-19 15:35:42
 * @LastEditors: lishutao
 * @Description: 暂无
 * @FilePath: \image-annotation-tool\src\pages\Home\Home.tsx
 */
// import { Link } from "react-router-dom";

import { Form, Input } from '@arco-design/web-react';
const FormItem = Form.Item;

import { Select } from '@arco-design/web-react';

import ImgSection from './ImgSection/ImgSection';

import EditForm  from './EditForm/EditForm';

const Option = Select.Option;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];

import "./Home.css"
export default function Home() {

  return (
    <div className="home-container">
    <ImgSection></ImgSection>
      {/* 底部表单 */}

    <EditForm></EditForm>
    </div>
  );
}
