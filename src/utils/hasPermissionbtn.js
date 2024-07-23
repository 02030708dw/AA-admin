import router from '@/router'
import store from '@/store'

const has = {}
has.install = (Vue) => {
    /**自定义按钮权限指令 */
    Vue.directive('has', {
        inserted(el, binding) {
            //从配置获取用户按钮权限
            let btnPermissions = store.getters.btnP
            //判断按钮权限
            let isExist = false
            //有权限的按钮集合；
            if (btnPermissions.includes(binding.value)) {
                isExist = true
            }
            //获取按钮权限
            if (!isExist) {
                //移除不匹配的元素
                el.parentNode.removeChild(el)
                // el.setAttribute("disabled",true)
            }
        },
    })
}
export default has