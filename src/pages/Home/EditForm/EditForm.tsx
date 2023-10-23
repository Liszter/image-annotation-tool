import React from 'react'
import { ipcRenderer } from 'electron';
import { Form, Input, Button, InputNumber } from '@arco-design/web-react';
const FormItem = Form.Item;
const { TextArea } = Input;
import { Select } from '@arco-design/web-react';
import { createExcel } from "../../../utils/excelFunc";
import './EditForm.css'
import { storage } from '../../../utils';

const Option = Select.Option;


const options = ['上部', '中部', '下部', '不确定'];
const options1 = ['不熟', '尚熟', '成熟', '过熟'];


export default function EditForm() {
  // 粘贴功能
  const handlePaste = (event) => {
    // 阻止默认的粘贴事件，避免浏览器默认将内容粘贴到输入框中
    event.preventDefault();

    navigator.clipboard.readText().then((pastedData) => {
      // 在这里处理剪贴板中的文本内容
      event.target.value = pastedData
    }).catch((error) => {
      console.error('无法读取剪贴板内容:', error);
    });
  };

  // 导出功能
  const handleExportExcel = () => {

    console.log(123, values)
    // 创建 excel  values 表格数据
    
    // path  路径
    const resultPath = storage.get('resultPath')

    console.log(6666, resultPath)

    createExcel(resultPath, values, resultPath)
  }

  const [values, setValues] = React.useState();

  return (
    <>
     {/* 底部表单 */}
     <div className="footer-form">
     {/* {JSON.stringify(values)} */}
     <Form
      style={{ width: '100%' }}
      layout="vertical" 
      autoComplete='off'
      onValuesChange={(_, values) => {
        console.log(12123123, values);
        setValues(values);
      }}
      >
       <div className='title-box'>
         温度阶段
       </div>
       <div className='flex justify-between'>
         <div>
           <FormItem label='1阶段末（36末）' field='one.step1'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='2阶段末（38末）七成黄' field='one.step2'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='3阶段末（40末）八成黄' field='one.step3'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='4阶段末（42末）九成黄' field='one.step4'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='5阶段末（44末）' field='one.step5'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='6阶段末（47末）' field='one.step6'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='7阶段末（50末）' field='one.step7'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='8阶段末（54末）' field='one.step8'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='9阶段末（60末）' field='one.step9'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='10阶段末（65末）' field='one.step10'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
       </div>


       <div className='title-box'>
         湿度阶段
       </div>

       <div className='flex justify-between'>
         <div>
         </div>
         <div>
           <FormItem label='叶片发软' field='two.step2'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='主筋发软' field='two.step3'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='充分塌架' field='two.step4'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='勾尖卷边' field='two.step5'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='支脉半干' field='two.step6'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
           <FormItem label='支脉干燥' field='two.step7'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
         <div>
         </div>
         <div>
         </div>
         <div>
           <FormItem label='干筋' field='two.step10'>
             <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
           </FormItem>
         </div>
       </div>

       <div className='title-box'>
         其他
       </div>

       <div className="flex justify-start">
         <FormItem label='烟叶品种' field='three.variety'>
           <Input placeholder='' onFocus={handlePaste} allowClear showWordLimit={true} />
         </FormItem>

         <FormItem label='生长部位' field='three.position'>
           <Select placeholder='选择生产部位' style={{ width: 154 }} allowClear>
             {options.map((option) => (
               <Option key={option} value={option}>
                 {option}
               </Option>
             ))}
           </Select>
         </FormItem>

         <FormItem label='成熟度' field='three.process'>
           <Select placeholder='选择成熟度' style={{ width: 154 }} allowClear>
             {options1.map((option) => (
               <Option key={option}  value={option}>
                 {option}
               </Option>
             ))}
           </Select>
         </FormItem>

         <FormItem label='备注' field='three.remark' style={{ flex: 1 }}>
           <TextArea placeholder=''  autoSize={{ minRows: 2, maxRows: 3 }} allowClear showWordLimit={true} />
         </FormItem>
       </div>

     </Form>

{/* 导出 box */}
     <div className='export-box'>
      <Button type='primary' onClick={handleExportExcel}>导出</Button>
     </div>
   </div>
   </>
  )
}
