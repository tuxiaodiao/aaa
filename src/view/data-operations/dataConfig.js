/**
 * 此文件用户配置常量，数据配置的部分都写在此文件中
 */
// 公共数据显示列
const editInlineAndCellColumn = [
  {title: '编号', key: 'code', width: 100, align: 'center'},
  {title: '名称', key: 'name', align: 'center', editable: true},
  {title: '描述', key: 'memo', align: 'center'},
  {title: '操作', align: 'center', width: 200, key: 'handle', handle: ['edit', 'delete']}
]

// 源数据显示列
const sourTableColumns = [
  {title: '唯一ID', key: '_id', align: 'center'},
  {title: '消息ID', key: 'msg_id', align: 'center'},
  {title: '消息时间', key: 'msg_time', align: 'center'},
  {title: '消息类型', key: 'msg_type', align: 'center'},
  {title: '景区', key: 'site', align: 'center'},
  {title: '源数据', key: 'queue', align: 'center'},
  {title: '处理标识', key: 'processed', align: 'center'},
  {title: '消息体', key: 'body', width: 100, align: 'center'}

]

const dctConfigColumn = [
  {title: '编码', key: 'name'},
  {title: '说明', key: 'memo', editable: true},
  {title: '属性', key: 'rel_type'},
  {title: '维护标识', key: 'set_auto'}
]

export {editInlineAndCellColumn, sourTableColumns, dctConfigColumn}
