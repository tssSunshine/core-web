import request from '../../utils/request';

//  查询部门列表
export function API_findDepartmentList (param) {
  return request.get('/department/findDepartmentList', param)
}

// 提交部门信息
export function API_saveDepartment (formData) {
  return request.post('/department/saveDepartment', formData)
}

// 删除部门信息
export function API_deleteDepartment (ids) {
  return request.delete('/department/deleteDepartment/' + ids)
}

//  查询部门列表
export function API_findDepartmentAll () {
  return request.get('/department/findAll', '')
}

// 根据ID查询部门信息
export function API_findDepartmentById (id) {
  return request.get('/department/findDepartmentById', id)
}
