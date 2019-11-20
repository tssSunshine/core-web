import request from '@/utils/request'

//  查询员工列表
export function API_findPersonnelList() {
  return request({
    url: '/personnel/findAll',
    method: 'get',
    params: {

    }
  })
}

//  条件查询员工列表
export function API_queryPersonnelList(param) {
  return request({
    url: '/personnel/queryPersonnelList',
    method: 'get',
    params: {
      param
    }
  })
}

// 根据ID查询员工信息
export function API_findPersonnelById(id) {
  return request({
    url: '/personnel/findById',
    method: 'get',
    params: {
      id
    }
  })
}

// 提交员工信息
export function API_savePersonnel(formData) {
  return request({
    url: '/personnel/savePersonnel',
    method: 'POST',
    data: formData
  })
}

// 删除员工信息
export function API_deletePersonnel(ids) {
  return request({
    url: '/personnel/deletePersonnel',
    method: 'POST',
    params: {
      ids
    }
  })
}
