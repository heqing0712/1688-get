import table2excel from 'js-table2excel'
import * as XLSX from 'xlsx/xlsx.mjs'
/**
 * 自动计算col列宽
 * @param ws
 * @param data
 */
function auto_width(ws, data) {
  /* set worksheet max width per col */
  const colWidth = data.map(row => row.map((val) => {
    /* if null/undefined */
    if (val == null) {
      return { wch: 10 }
    }
    /* if chinese */
    else if (val.toString().charCodeAt(0) > 255) {
      return { wch: val.toString().length * 2 }
    }
    else {
      return { wch: val.toString().length }
    }
  }))
  /* start in the first row */
  const result = colWidth[0]
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j].wch < colWidth[i][j].wch) {
        result[j].wch = colWidth[i][j].wch
      }
    }
  }
  ws['!cols'] = result
}

/**
 * 将json数据转换成数组
 * @param key
 * @param jsonData
 * @returns
 */
function json_to_array(key, jsonData) {
  return jsonData.map(v => key.map((j) => {
    return v[j]
  }))
}

/**
 * @param header Object，表头
 * @param data Array，表体数据
 * @param title String，标题（会居中显示），即excel表格第一行
 * @param filename String，文件名
 * @param autoWidth Boolean，是否自动根据key自定义列宽度
 */
export function exportJsonToExcel(header, data, filename, objs) {
  const wb = XLSX.utils.book_new()
  const autoWidth = true
  if (header) {
    data.unshift(header)
  }

  const ws = XLSX.utils.json_to_sheet(data, {
    skipHeader: true,
  })
  if (autoWidth) {
    auto_width(ws, data)
  }
  // data.map((d: any, i: number) => {
  //   if (i === 0)
  //     return

  //   const base64 = objs[d[1]]
  //   const imageId = wb.addImage({
  //     base64,
  //     extension: 'png', // 图片的扩展名
  //   })

  //   wb.addImage(imageId, {
  //     tl: {
  //       col: 3,
  //       row: i,
  //     },
  //     ext: {
  //       width: 100,
  //       height: 100,
  //     },
  //   })
  // })

  XLSX.utils.book_append_sheet(wb, ws, filename)
  XLSX.writeFile(wb, `${filename}.xlsx`)
}

export function exportJsonToExcelx() {
  const column = [
    {
      title: '宠物',
      key: 'name',
    },
    {
      title: '图例',
      key: 'pic',
      type: 'image',
    },
  ]

  const data = [
    {
      name: 'dog',
      pic: 'https://t7.baidu.com/it/u=848096684,3883475370&fm=193&f=GIF',
      size: [100, 60], // image size for picture
    },
    {
      name: 'cat',
      pic: 'https://t7.baidu.com/it/u=2272690563,768132477&fm=193&f=GIF',
    },
  ]

  const excelName = '爱宠'

  table2excel({
    column,
    data,
    excelName,
  })
// you can also use
// table2excel(column, data, excelName, captionName)
}
