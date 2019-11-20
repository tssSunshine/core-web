//引入mockjs
import Mock from 'mockjs'
//使用mockjs模拟数据
export default Mock.mock('/api/departments', (req, res) => {
     return Mock.mock({
        "departments|1-10": [{
          'deptName': '@cname',
          'deptCode|+1': 1,
        'age|10-60': 0,    //10-60以内的随机数，0用来确定类型
           'date': '@date("yyyy-MM-dd")',    //年月日
          'username':'@cname',
           'phoneNum': '15874563214'
       }]
     })
})
