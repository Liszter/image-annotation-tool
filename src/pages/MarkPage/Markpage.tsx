/*
 * @Author: liszter <liszter@qq.com>
 * @Date: 2023-10-17 10:49:23
 * @LastEditTime: 2023-10-20 17:06:39
 * @LastEditors: lishutao
 * @Description: 暂无
 * @FilePath: \image-annotation-tool\src\pages\MarkPage\Markpage.tsx
 */
// import * as fs from 'fs'
// import * as path from 'path'
import { ipcRenderer } from 'electron';
// import { exportExcel } from "../../utils/excelFunc"
import { useState } from 'react';

export default function Markpage() {

  const [imageList, setImageList] = useState()

  const choosefile = () => {
  ipcRenderer.send('chooseFile');
  ipcRenderer.on('chooseResult', (event, filePaths) => {
    // 处理对话框结果
    console.log(event,  filePaths.filePaths);

    setImageList(filePaths.filePaths[0])
  });
}


  const handleChoose = (e) => {
    console.log(e.target.files[0])

    const path = e.target.files[0].path
    setImageList(path)
  }
  


  return (
    <div>
      markpage------------
      {/* <button onClick={exportExcel}> excel导出 </button> */}
      
      <button onClick={choosefile}> 导入图片文件 </button>

      {/* <img src={imageList} /> */}

      {imageList.map((path, index) => (
        <img key={index} src={path} alt={`Image ${index}`} />
      ))}


      <input type="file" id='chooseF' accept="image/**" onInput={handleChoose} multiple/>
    </div>
  )
}
