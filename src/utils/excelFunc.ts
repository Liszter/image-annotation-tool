import ExcelJS from 'exceljs';
import fileSaver from 'file-saver';
import fs from "electron"
import { ipcRenderer } from 'electron';

import { storage } from '../utils/index';

//通过列数获取excel表头编号
const getColumnNameByIndex = (i: number) => {
  let result = String.fromCharCode('A'.charCodeAt() + (i % 26))
  while (i >= 26) {
    i /= 26
    i--
    result = String.fromCharCode('A'.charCodeAt() + (i % 26)) + result
  }
  return result
}

// 导出excel

/**
 * @param tableName 表格名
 * @param tableData 表格数据
 * @param path 路径
 * 
 * */
export function createExcel(tableName: string, tableData: object, path: string) {




  console.log(444, tableData, tableName)
  
  const pathObj = {
    path: path
  }

  const oneObj = JSON.parse(JSON.stringify(tableData.one))
  const twoSheetObj = JSON.parse(JSON.stringify(tableData.two))
  const threeSheetObj = JSON.parse(JSON.stringify(tableData.three))

  
  // 表格数据
  // tableData
  const data1 = Object.assign(oneObj, pathObj)
  const data2 = Object.assign(twoSheetObj, pathObj)
  const data3 = Object.assign(threeSheetObj, pathObj)

  console.log('data1', data1, data2, data3)



  // 创建
  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'Liszter'
  workbook.created = new Date()

  // 创建工作表
  const worksheet1 = workbook.addWorksheet('温度阶段');
  const worksheet2 = workbook.addWorksheet('湿度阶段');
  const worksheet3 = workbook.addWorksheet('其他');

  // 表头数据
  const tableHeader1 = [
    { header: '路径', key: 'path', width: 80 },
    { header: '1阶段末(36末)', key: 'step1', width: 80 },
    { header: '2阶段末（38末）七成黄', key: 'step2', width: 80 },
    { header: '3阶段末（40末）八成黄', key: 'step3', width: 80 },
    { header: '4阶段末（42末）九成黄', key: 'step4', width: 80 },
    { header: '5阶段末（44末）', key: 'step5', width: 80 },
    { header: '6阶段末（47末）', key: 'step6', width: 80 },
    { header: '7阶段末（50末）', key: 'step7', width: 80 },
    { header: '8阶段末（54末）', key: 'step8', width: 80 },
    { header: '9阶段末（60末）', key: 'step9', width: 80 },
    { header: '10阶段末（65末）', key: 'step10', width: 80 },

  ];

  const tableHeader2 = [
    { header: '路径', key: 'path', width: 80 },
    { header: '叶片发软', key: 'step2', width: 80 },
    { header: '叶片发软', key: 'step3', width: 80 },
    { header: '充分塌架', key: 'step4', width: 80 },
    { header: '勾尖卷边', key: 'step5', width: 80 },
    { header: '支脉半干', key: 'step6', width: 80 },
    { header: '支脉干燥', key: 'step7', width: 80 },
    { header: '干筋', key: 'step10', width: 80 },
  ];

  const tableHeader3 = [
    { header: '路径', key: 'path', width: 80 },
    { header: '烟叶品种', key: 'variety', width: 80 },
    { header: '生长部位', key: 'position', width: 80 },
    { header: '成熟度', key: 'process', width: 80 },
    { header: '备注', key: 'remark', width: 80 },
  ];

  worksheet1.columns = tableHeader1
  worksheet2.columns = tableHeader2
  worksheet3.columns = tableHeader3


  //设置表头样式
  const style = {
    font: {
      name: '宋体',
      size: 12,
      bold: true,
      color: { argb: '#00000000' }
    },
    alignment: {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: false
    },
    border: {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    },
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '008cff66' },
      bgColor: { argb: 'FF0000FF' }
    }
  }

  // 数据组

  worksheet1.addRow(data1)
  worksheet2.addRow(data2)
  worksheet3.addRow(data3)

  //遍历工作表，给需要添加样式的单元格添加相应的样式
  for (let i = 1; i < worksheet1.columns.length + 1; i++) {
    const cellName = getColumnNameByIndex(i - 1) + 1
    worksheet1.getCell(cellName).style = style
    let maxLen = 0
    for (let k = 1; k < worksheet1._rows.length + 1; k++) {
      worksheet1.getRow(k).height = 18.5 //行高
      // 计算列自适应宽度，限制最宽为20（一个中文字符宽度为2，英文和数字宽度为1.5）
      let cellValue = worksheet1.getCell(getColumnNameByIndex(i - 1) + k).value
      let strLen = 0
      if (cellValue !== null && cellValue !== '') {
        cellValue = cellValue.toString()
        const chVal = cellValue.match(/[\u4e00-\u9fa5]/g)
          ? cellValue.match(/[\u4e00-\u9fa5]/g).join('')
          : ''
        const engVal = cellValue.replace(/([^\u0000-\u00FF])/g, '') || ''
        strLen += chVal.length * 2 + engVal.length * 1.5
        if (strLen > maxLen) {
          maxLen = strLen
        }
      }
    }
    maxLen > 20 ? (maxLen = 20) : null
    worksheet1.getColumn(i).width = maxLen //列宽
  }

  //遍历工作表，给需要添加样式的单元格添加相应的样式
  for (let i = 1; i < worksheet2.columns.length + 1; i++) {
    const cellName = getColumnNameByIndex(i - 1) + 1
    worksheet2.getCell(cellName).style = style
    let maxLen = 0
    for (let k = 1; k < worksheet2._rows.length + 1; k++) {
      worksheet2.getRow(k).height = 13.5 //行高
      // 计算列自适应宽度，限制最宽为20（一个中文字符宽度为2，英文和数字宽度为1.5）
      let cellValue = worksheet2.getCell(getColumnNameByIndex(i - 1) + k).value
      let strLen = 0
      if (cellValue !== null && cellValue !== '') {
        cellValue = cellValue.toString()
        const chVal = cellValue.match(/[\u4e00-\u9fa5]/g)
          ? cellValue.match(/[\u4e00-\u9fa5]/g).join('')
          : ''
        const engVal = cellValue.replace(/([^\u0000-\u00FF])/g, '') || ''
        strLen += chVal.length * 2 + engVal.length * 1.5
        if (strLen > maxLen) {
          maxLen = strLen
        }
      }
    }
    maxLen > 20 ? (maxLen = 20) : null
    worksheet2.getColumn(i).width = maxLen //列宽
  }

  //遍历工作表，给需要添加样式的单元格添加相应的样式
  for (let i = 1; i < worksheet3.columns.length + 1; i++) {
    const cellName = getColumnNameByIndex(i - 1) + 1
    worksheet3.getCell(cellName).style = style
    let maxLen = 0
    for (let k = 1; k < worksheet3._rows.length + 1; k++) {
      worksheet3.getRow(k).height = 13.5 //行高
      // 计算列自适应宽度，限制最宽为20（一个中文字符宽度为2，英文和数字宽度为1.5）
      let cellValue = worksheet3.getCell(getColumnNameByIndex(i - 1) + k).value
      let strLen = 0
      if (cellValue !== null && cellValue !== '') {
        cellValue = cellValue.toString()
        const chVal = cellValue.match(/[\u4e00-\u9fa5]/g)
          ? cellValue.match(/[\u4e00-\u9fa5]/g).join('')
          : ''
        const engVal = cellValue.replace(/([^\u0000-\u00FF])/g, '') || ''
        strLen += chVal.length * 2 + engVal.length * 1.5
        if (strLen > maxLen) {
          maxLen = strLen
        }
      }
    }
    maxLen > 20 ? (maxLen = 20) : null
    worksheet3.getColumn(i).width = maxLen //列宽
  }


  // 导出
  workbook.xlsx.writeBuffer().then(function (buffer) {


    
    const filePath = storage.get('folderPath')
    // fs.writeFile(filePath, Buffer.from(buffer), (err) => {
    //   if (err) throw err;
    //   console.log('Blob file saved successfully!');
    // });

    ipcRenderer.send('saveFile', {
      filePath: filePath + "/" + tableName + '.xlsx',
      buffer: buffer
    });




    // fileSaver(
    //   new Blob([buffer], {
    //     type: 'application/octet-stream'
    //   }),
    //   `${tableName}.xlsx`
    // )
  })

}