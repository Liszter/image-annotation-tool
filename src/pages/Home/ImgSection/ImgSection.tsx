import { Form, Button, Modal, Notification } from '@arco-design/web-react';
import { ipcRenderer } from 'electron';
const FormItem = Form.Item;

import { Image, Space } from '@arco-design/web-react';
import { IconBackward, IconCaretLeft, IconCaretRight, IconForward } from '@arco-design/web-react/icon';
import CopyButton from '../../../components/CopyButton/CopyButton';
import { useRef, useState, useEffect } from 'react';
import "./ImgSection.css";

import { storage } from '../../../utils';

import uploadImage from '../../../assets/icon_upload.svg'


export default function ImgSection() {

  const [documentSize, setDocumentSize] = useState({ width: 0, height: 0 });


  useEffect(() => {
    const updateDocumentSize = () => {
      setDocumentSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
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


  const [srcList, setSrcList] = useState([]);
  const containerRef = useRef(null);

  const [previewVisible, setPreviewVisible] = useState(false);

  // 实现一个 图片放大展示组件
  const [showFlagIndex, setShowFlagIndex] = useState(0)





  // 按钮组
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 435 + 12; // 向左滚动 100 像素
    }

    // 控制当前显示的图片 index
    if (showFlagIndex > 0) {
      setShowFlagIndex(showFlagIndex - 1)
    }

  };
  const scrollLeftX4 = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= (435 + 12) * 4; // 向左滚动 100 像素
    }
  };
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 435 + 12; // 向右滚动 100 像素
    }

    // 控制当前显示的图片 index
    if (showFlagIndex >= 0 && showFlagIndex < srcList.length - 1) {
      console.log(123333, showFlagIndex)
      setShowFlagIndex(showFlagIndex + 1)
    }
  };
  const scrollRightX4 = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += (435 + 12) * 4; // 向右滚动 100 像素
    }
  };



  // 选择图片
  const handleChoose = (e) => {
    console.log(e.target.files)
    const filepath = e.target.files[0].path
    console.log('filepath', filepath)

    // 保存结果文件
    const regExp = /(?<=\\)[^\\]+(?=\\[^\\]+$)/;
    const result = filepath.match(regExp);

    // 保存结果文件的 文件夹路径
    const folderPathRegex = /^(.*[\\\/])[^\\\/]+$/; // 正则表达式
    const folderPath = filepath.match(folderPathRegex)[1];


    storage.set('resultPath', result[0])
    storage.set('folderPath', folderPath)


    const pathObj = e.target.files

    const path = []
    Object.keys(pathObj).forEach(key => {
      const value = pathObj[key];
      // console.log(`Key: ${key}, Value: ${value}`);

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

  // 按钮文件
  const btnGroups =
    (srcList.length > 4 ? (
      <div>

        <div className='pre-btn'>
          <Button shape='circle' type='outline' onClick={scrollLeft} icon={<IconCaretLeft />} />
          <Button shape='circle' type='outline' onClick={scrollLeftX4} icon={<IconBackward />} />
        </div>
        <div className='next-btn'>
          <Button shape='circle' type='outline' onClick={scrollRight} icon={<IconCaretRight />} />
          <Button shape='circle' type='outline' onClick={scrollRightX4} icon={<IconForward />} />
        </div>
      </div>

    ) : '')



  const btnGroupsPreview = (
    <div className='preview-btn'>

      <div className='pre-btn'>
        <Button shape='circle' type='outline' onClick={scrollLeft} icon={<IconCaretLeft />} />
      </div>
      <div className='next-btn'>
        <Button shape='circle' type='outline' onClick={scrollRight} icon={<IconCaretRight />} />
      </div>
    </div>

  )


  const viewImageList = function (index) {
    setShowFlagIndex(index)

    setPreviewVisible(true)
  }

  const priviewImageOk = (text) => {

    navigator.clipboard.writeText(text)
      .then(() => {
        Notification.success({
          closable: false,
          title: '提示',
          content: `复制成功! ${text}`,
        })
        setPreviewVisible(false)

      })
      .catch((error) => {
        console.error('复制失败: ', error);
      });


  }

  return (

    srcList.length > 0 ? (
      <div className='img-section'>

        <Modal
          title='查看图片'
          visible={previewVisible}
          autoFocus={false}
          focusLock={true}
          onOk={() => priviewImageOk(srcList[showFlagIndex].name)}
          onCancel={() => setPreviewVisible(false)}
          okText={'复制名称'}
          style={{ cursor: 'move', width: documentSize.width * 0.9, height: documentSize.height * 0.95 }}
        >
          <div className='preview-img'>
            {/* 
          {JSON.stringify(srcList[showFlagIndex])}
           */}
            {btnGroupsPreview}

            {srcList[showFlagIndex].name}
            <Image src={srcList[showFlagIndex].path} width={documentSize.width * 0.6} height={documentSize.height * 0.76} />
          </div>
        </Modal>



        <div className='img-list' ref={containerRef}>
          <Image.PreviewGroup infinite  >
            <Space>
              {srcList.map((src, index) => (
                <div className='img-warp' key={index} style={{ boxShadow: showFlagIndex === index ? '0 6px 16px 2px  rgba(7, 12, 20, 0.8)' : '' }}>
                  <div className='section-id'>
                    {src.id}
                  </div>
                  <Image preview={false} src={src.path} width={435} height={327} alt={`lamp${index + 1}`} onClick={() => viewImageList(index)} />
                  {/* 复制 */}
                  <div className='img-id'>
                    <CopyButton text={src.name} />
                  </div>
                </div>
              ))}
            </Space>
          </Image.PreviewGroup>
        </div>
        {btnGroups}

      </div>
    ) : (
      <div className='upload-box'>

        <div className='upload-icon'>
          <Image src={uploadImage} width={120} preview={false} />
        </div>
        <div className='upload-btn'>
          <label htmlFor={'chooseF'}>
            <button onClick={() => handleClickUpload(event)}>点击上传图片文件</button>

            <input style={{ display: 'none' }} type="file" id='chooseF' accept="image/*" onInput={handleChoose} multiple />
          </label>

        </div>
      </div>
    )
  )
}
