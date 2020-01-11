import request from '../../utils/request';

//  查询员工列表
export function API_findPersonnelList () {
  return request.get('/personnel/findAll', '')
}

//  条件查询员工列表
export function API_queryPersonnelList (param) {
  return request.get('/personnel/queryPersonnelList', param)
}

// 根据ID查询员工信息
export function API_findPersonnelById (id) {
  return request.get('/personnel/findById/' + id)
}

// 提交员工信息
export function API_savePersonnel (formData) {
  return request.post('/personnel/savePersonnel', formData)
}

// 删除员工信息
export function API_deletePersonnel (ids) {
  return request.post('/personnel/deletePersonnel', ids)
}
