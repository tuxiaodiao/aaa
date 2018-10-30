const userListColumn = [
  {title: '登录名', key: 'login', align: 'center', width: 100, fixed: 'left'},
  {title: '用户邮箱', key: 'email', width: 150, align: 'center'},
  {title: '手机号码', key: 'phone', width: 150, align: 'center'},
  {title: '用户名', key: 'username', width: 100, align: 'center'},
  // {title: '属主',key: 'owner',width: 100,align: 'center'},
  {title: '用户权限', key: 'roles', width: 150, align: 'center'},
  {title: '景区权限', key: 'sites', width: 300, align: 'center'},
  {title: '用户状态', key: 'is_enable', width: 100, align: 'center'},
  {title: '上次登录时间', key: 'last_login_time', width: 200, align: 'center'},
  {title: '备注信息', key: 'memo', width: 100, align: 'center'},
  // {title: '唯一ID',key: 'id',width: 100,align: 'center'},
  {title: '注册时间', key: 'create_time', width: 200, align: 'center'},
  {title: '操作', key: 'action', width: 320, align: 'center', fixed: 'right'}
]

const access = {
  super_admin: '超级管理员',
  admin: '管理员',
  operator: '操作员',
  user: '普通用户',
  guest: '游客'
}

const sites = ['N001', 'S001', 'W001']

//  用户权限配置
const roles = {
  super_admin: ['super_admin', 'admin', 'operator', 'user', 'guest'],
  admin: ['admin', 'operator', 'user', 'guest'],
  operator: ['operator', 'user', 'guest'],
  user: ['user', 'guest'],
  guest: ['guest']
}

export { userListColumn, roles, access, sites }
