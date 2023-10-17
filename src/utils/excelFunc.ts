import ExcelJS from 'exceljs';
import fileSaver from 'file-saver';

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

export async function exportExcel() {
  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'Liszter'
  workbook.created = new Date()

  // 创建工作表
  const worksheet = workbook.addWorksheet('Sheet 1');

  // 设置表头
  worksheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Age', key: 'age', width: 10 },
    { header: 'Email', key: 'email', width: 30 }
  ];

  const data = [
    { name: 'John', age: 30, email: 'john@example.com' },
    { name: 'Jane', age: 25, email: 'jane@example.com' },
    { name: 'Bob', age: 40, email: 'bob@example.com' }
  ];

  // 添加数据行
  data.forEach(item => {
    worksheet.addRow({
      name: item.name,
      age: item.age,
      email: item.email
    });
  });

  //设置表头样式
  const style = {
    font: {
      name: '宋体',
      size: 11,
      bold: true,
      color: { argb: '#00000000' }
    },
    alignment: {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: false
    },
    border: {
      top: {style: 'thin'},
      bottom: {style: 'thin'},
      left: {style: 'thin'},
      right: {style: 'thin'}
    },
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '008cff66' },
      bgColor: { argb: 'FF0000FF' }
    }
  }

  //遍历工作表，给需要添加样式的单元格添加相应的样式
  for (let i = 1; i < worksheet.columns.length + 1; i++) {
    const cellName = getColumnNameByIndex(i - 1) + 1
    worksheet.getCell(cellName).style = style
    let maxLen = 0
    for (let k = 1; k < worksheet._rows.length + 1; k++) {
      worksheet.getRow(k).height = 13.5 //行高
      // 计算列自适应宽度，限制最宽为20（一个中文字符宽度为2，英文和数字宽度为1.5）
      let cellValue = worksheet.getCell(getColumnNameByIndex(i - 1) + k).value
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
    worksheet.getColumn(i).width = maxLen //列宽
  }

  // 导出
  workbook.xlsx.writeBuffer().then(function (buffer) {
    fileSaver(
      new Blob([buffer], {
        type: 'application/octet-stream'
      }),
      `${'newfile'}.xlsx`
    )
  })
}