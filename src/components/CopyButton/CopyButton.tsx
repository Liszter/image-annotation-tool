/*
 * @Author: liszter <liszter@qq.com>
 * @Date: 2023-10-19 14:25:10
 * @LastEditTime: 2023-10-19 14:37:59
 * @LastEditors: lishutao
 * @Description: 暂无
 * @FilePath: \image-annotation-tool\src\components\CopyButton\CopyButton.tsx
 */
import { Notification, Button } from '@arco-design/web-react';

function CopyButton({ text }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        Notification.success({
          closable: false,
          title: '提示',
          content: `复制成功! ${text}`,
        })
      })
      .catch((error) => {
        console.error('复制失败: ', error);
      });
  };

  return (
    <Button type='dashed' style={{width: '100%', height: '100%'}} onClick={copyToClipboard}>{text}</Button >
  );
}

export default CopyButton;
