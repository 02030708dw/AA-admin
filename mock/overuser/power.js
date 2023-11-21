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
    id: 1,
    name: 'test',
    statu: true,
    children: [
      { id: 62, name: 'test', statu: true },
      { id: 82, name: 'test2', statu: true }
    ]
  },
  {
    id: 2,
    name: 'test',
    statu: true,
    children: [
      { id: 12, name: 'test', statu: true },
      { id: 16, name: 'test2', statu: true }
    ]
  },
  {
    id: 3,
    name: 'usermag',
    statu: false,
    children: []
  },
  {
    id: 4,
    name: 'mesmag',
    statu: true,
    children: []
  },
  {
    id: 5,
    name: 'test',
    statu: false,
    children: []
  },
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

