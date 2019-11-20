import request from '@/utils/request'

//  查询部门列表
export function API_findDepartmentList(param) {
  return request({
    url: '/department/findDepartmentList',
    method: 'get',
    params: {
      param
    }
  })
}

// 提交部门信息
export function API_saveDepartment(formData) {
  return request({
    url: '/department/saveDepartment',
    method: 'POST',
    data: formData
  })
}

// 删除部门信息
export function API_deleteDepartment(ids) {
  return request({
    url: '/department/deleteDepartment',
    method: 'POST',
    params: {
      ids
    }
  })
}

//  查询部门列表
export function API_findDepartmentAll() {
  return request({
    url: '/department/findAll',
    method: 'get',
    params: {

    }
  })
}

// 根据ID查询部门信息
export function API_findDepartmentById(id) {
  return request({
    url: '/department/findDepartmentById',
    method: 'get',
    params: {
      id
    }
  })
}
