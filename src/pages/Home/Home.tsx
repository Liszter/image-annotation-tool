/*
 * @Author: liszter <liszter@qq.com>
 * @Date: 2023-10-25 15:05:39
 * @LastEditTime: 2023-10-26 15:52:59
 * @LastEditors: lishutao
 * @Description: 暂无
 * @FilePath: \image-annotation-tool\src\pages\Home\Home.tsx
 */
import ImgSection from './ImgSection/ImgSection';

import EditForm  from './EditForm/EditForm';

import "./Home.css"
import { useEffect, useState } from 'react';
export default function Home() {

  const [documentSize, setDocumentSize] = useState({ width: 0, height: 0 });
  const [screenRate, setScreenRate] = useState(1);
  
  useEffect(() => {
    const updateDocumentSize = () => {
      setDocumentSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      });

      const windowH = document.documentElement.clientHeight,
      windowW = document.documentElement.clientWidth;
    
      const screenRate = Math.min(windowH / 998, windowW / 1920);
      
      setTransformObj(`scaleX(${screenRate}) scaleY(${screenRate}) translateX(-50%) translateY(-50%)`)
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // 可选，使滚动过程平滑
      });
    };

    // 初始化时获取一次宽高
    updateDocumentSize();

    // 监听窗口大小变化事件，更新宽高
    window.addEventListener('resize', updateDocumentSize);

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('resize', updateDocumentSize);
    };
  }, []);


  const [transformObj, setTransformObj] = useState(`scaleX(${screenRate}) scaleY(${screenRate}) translateX(-50%) translateY(-50%)`)


  return (
    <div className='s-scalebox' style={documentSize}> 

    <div className="scale-box" style={{ transform: transformObj }}>
      <ImgSection></ImgSection>
        {/* 底部表单 */}

      <EditForm></EditForm>
    </div>
    </div>

  );
}
