const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  language: state => state.app.language,
  size: state => state.app.size,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  userObj: state => state.user.name,
  gamer: state => state.user.gamer,
  roles: state => state.permission.roles,
  routes: state => state.permission.routes,
  btnP: state => state.permission.btnP,
}
export default getters
