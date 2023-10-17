import { exportExcel } from "../../utils/excelFunc"

export default function Markpage() {
  return (
    <div>
      markpage------------
      <button onClick={exportExcel}> excel导出 </button>

      {/* <button onClick={exportExcel}> 获取某个文件夹的文件及文件夹名称 </button> */}


    </div>
  )
}
