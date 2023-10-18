import { ipcRenderer } from 'electron';
import { exportExcel } from "../../utils/excelFunc"
import { useState } from 'react';
import "./Markpage.css"

export default function Markpage() {

  const [imageList, setImageList] = useState([])

  const choosefile = () => {
  ipcRenderer.send('chooseFile');
  ipcRenderer.on('chooseResult', (event, filePaths) => {
    // 处理对话框结果
    console.log(event,  filePaths.filePaths);

    setImageList(filePaths.filePaths)
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
      <button onClick={exportExcel}> excel导出 </button>
      
      <button onClick={choosefile}> 导入图片文件 </button>

      {/* <img src={imageList} /> */}

      {imageList.map((path, index) => (
        <img key={index} src={path} className='img-box' alt={`Image ${index}`} />
      ))}


      <input type="file" id='chooseF' accept="image/**" onInput={handleChoose} multiple/>
    </div>
  )
}
