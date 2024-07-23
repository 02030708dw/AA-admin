
import { allByUser } from '@/api/systemmag/role'
import router, { asyncRoutes, filterAsyncRoutes, flatten } from '@/router'
import Layout from '@/layout'
const getDefaultState = () => {
    return {
        roles: [],//返回权限
        routes: [],//过滤路由权限
        btnP:[]//按钮权限
    }
}
const state = getDefaultState()

const mutations = {
    SET_ROLES: (state, avatar) => {
        state.roles = avatar

    },
    SET_ROUTES: (state, avatar) => {
        state.routes = avatar
    },
    SET_BTNP: (state, avatar) => {
        state.btnP = avatar
    },
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
}

const actions = {
    // 获取用户路由信息
    async getRouter({ commit }) {
        return await new Promise((resolve, reject) => {
            allByUser().then(response => {
                commit('SET_ROLES', response.resultSet.authorityDtos)
                resolve(response.resultSet.authorityDtos)
            }).catch(error => {
                reject(error)
            })
        })
    },
    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {

            let nameList = []
            let btnP = []
            flatten(nameList, roles, btnP) //返回nameList,btnP
            const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles, nameList)
            commit('SET_BTNP', btnP)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    },
}


// function hasPermission(nameList, route) {
//     return nameList.some((item) => {
//         return item.name === route.name;
//     }) || nameList.some((item) => {
//         return item.path === route.path;
//     })

// }
// //扁平化获取name方法
// function flatten(nameList = [], data) {
//     data.forEach(v => {
//         if (v.children && v.children.length > 0) {
//             // 是否是按钮权限页
//             let isbtnP = v.children[0].code.match(/:(.*)$/)
//             if (isbtnP == null) {
//                 nameList.push({ name: v.code, path: v.menuUrl })
//                 flatten(nameList, v.children)
//             } else {
//                 let btnP = []
//                 v.children.forEach(item => {
//                     btnP.push(item.code.match(/:(.*)$/)?.[1])
//                 })
//                 nameList.push({ name: v.code, path: v.menuUrl, btnP })
//             }
//         } else {
//             nameList.push({ name: v.code, path: v.menuUrl })
//         }
//     })
//     return nameList
// }
// /**
//  * Filter asynchronous routing tables by recursion
//  * @param routes asyncRoutes
//  * @param roles
//  */
// function filterAsyncRoutes(routes, roles, nameList) {
//     let res = []
//     routes.forEach(route => {
//         const tmp = { ...route }
//         if (hasPermission(nameList, tmp)) {
//             if (tmp.children) {
//                 tmp.children = filterAsyncRoutes(tmp.children, roles, nameList)
//             }
//             res.push(tmp)
//         }
//     })
//     return res
// }
export default {
    namespaced: true,
    state,
    mutations,
    actions
}

