import { Form, Button } from '@arco-design/web-react';
import { ipcRenderer } from 'electron';
const FormItem = Form.Item;

import { Image, Space } from '@arco-design/web-react';
import { IconCaretLeft, IconCaretRight } from '@arco-design/web-react/icon';
import CopyButton from '../../../components/CopyButton/CopyButton';
import { useRef, useState } from 'react';
import "./ImgSection.css";

import uploadImage from '../../../assets/icon_upload.svg'


export default function ImgSection() {


  const [srcList, setSrcList] = useState([]);


  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 435 + 8; // 向左滚动 100 像素
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 435 + 8; // 向右滚动 100 像素
    }
  };

  const handleChoose = (e) => {
    console.log(e.target.files, typeof e.target.files)
    const pathObj = e.target.files
    const path = []
    Object.keys(pathObj).forEach(key => {
      const value = pathObj[key];
      console.log(`Key: ${key}, Value: ${value}`);
      
      path.push({
        id: key,
        name: value.name,
        path: value.path
      })
    });
    // const path = e.target.files
    setSrcList(path)
  }
  

  
  // 模拟点击 触发input 的默认事件
  const handleClickUpload = (event) => {
    event.preventDefault();
    const dom = document.getElementById('chooseF')
    if (dom) {
      dom.click();
    }
  }

  return (

    srcList.length > 0 ? (
      <div className='img-section'>
        {/* <div>
    {srcList.length}  {containerRef.current && containerRef.current.scrollLeft}
  </div> */}
        <div className='img-list' ref={containerRef}>
          <Image.PreviewGroup infinite>
            <Space>
              {srcList.map((src, index) => (
                <div className='img-warp' key={index} >
                  <div className='section-id'>
                    {src.id}
                  </div>
                  <Image src={src.path} width={435} height={327} alt={`lamp${index + 1}`} />

                  {/* <Image src={src} width={616} height={465} alt={`lamp${index + 1}`} /> */}
                  <div className='img-id'>
                    <CopyButton text={src.name} />
                  </div>
                </div>

              ))}
            </Space>
          </Image.PreviewGroup>
        </div>

        <div className='pre-btn'>
          <Button shape='circle' type='outline' onClick={scrollLeft} icon={<IconCaretLeft />} />
        </div>
        <div className='next-btn'>
          <Button shape='circle' type='outline' onClick={scrollRight} icon={<IconCaretRight />} />
        </div>
      </div>
    ) : (
      <div className='upload-box'>

        <div className='upload-icon'>
          <Image src={uploadImage} width={120} preview={false} />
        </div>
        <div className='upload-btn'>
          <label htmlFor={'chooseF'}>
          <button onClick={()=>handleClickUpload(event)}>点击上传图片文件</button>

          <input style={{display: 'none'}} type="file" id='chooseF' accept="image/**" onInput={handleChoose} multiple/>
          </label>

        </div>
      </div>
    )
  )
}
