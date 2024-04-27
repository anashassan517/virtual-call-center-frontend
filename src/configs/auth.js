import Cookies from 'js-cookie'

export default {
  meEndpoint: '/protected',
  loginEndpoint: '/Signin',
  resetPassword: '/changePasssword',
  registerEndpoint: '/Signup',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken',
  setToken: token => {
    if (token) {
      Cookies.set('accessToken', token)
    }
  },
  getToken: () => Cookies.get('accessToken'),
  removeToken: () => Cookies.remove('accessToken'),
  getDashboardData: '/dashboard',

}
