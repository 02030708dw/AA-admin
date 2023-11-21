// const Mock = require('mockjs')

// const data = Mock.mock({
//   'items|30': [{
//     id: '@id',
//     title: '@sentence(10, 20)',
//     'status|1': ['published', 'draft', 'deleted'],
//     author: 'name',
//     display_time: '@datetime',
//     pageviews: '@integer(300, 5000)'
//   }]
// })

const data = [
  {
    name: 'test',
    statu: true,
    children: [
      { path: 'test', name: 'test', statu: true },
      { path: 'test2', name: 'test2', statu: true }
    ]
  },
  {
    name: 'test',
    statu: true,
    children: [
      { path: 'test', name: 'test', statu: true },
      { path: 'test2', name: 'test2', statu: true }
    ]
  }
]

module.exports = [
  // 取得权限列表
  {
    url: '/getPower',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: data
      }
    }
  }
]

