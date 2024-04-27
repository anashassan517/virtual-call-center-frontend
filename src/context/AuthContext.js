// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

import Cookies from 'js-cookie'
import api from 'src/apis/axios/instance'
import toast from 'react-hot-toast'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  me: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    router.pathname,
  ])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(`http://localhost:5000/api/spade/${authConfig.loginEndpoint}`, params)
      .then(async response => {
        toast.success('Login successful')
        !params.rememberMe ? authConfig.setToken(response?.data?.token) : null
        const returnUrl = router.query.returnUrl
        console.log("response.data.userData",response.data)
        setUser({ ...response.data })
        !params.rememberMe ? Cookies.set('userData', JSON.stringify(response.data)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/dashboards/crm';

        if(!response.data.audio){
          router.push('/assessment')
        }else{
          router.push(redirectURL)
        }

      })
      .catch(err => {
        toast.error('Invalid email or password')
        if (errorCallback) errorCallback(err)
      })
  }

const handleRegister = (params) => {
    api
      .post(authConfig.registerEndpoint, params)
      .then(async response => {
        toast.success('Register successful')
        if(router.pathname.includes('register')){
          router.push('/pages/auth/login-v1/')
        }

      })
      .catch(err => {
        console.log(err)

        toast.error(err.response.data.message)
      })
}

  const handleLogout = () => {
    setUser(null)
    Cookies.remove('userData')
    Cookies.remove(authConfig.storageTokenKeyName)
    router.push('/pages/auth/login-v1/')
  }

  const handleResetPassword = (params, errorCallback) => {
    console.log(Cookies.get(authConfig.storageTokenKeyName))
    api
      .put(authConfig.resetPassword,params,{
        headers: {
          Authorization: `Bearer ${Cookies.get(authConfig.storageTokenKeyName)}`
        }

      })
      .then((response) => {
        toast.success('Password reset successful')
        Cookies.set('userData', JSON.stringify(response.data))
        setUser({ ...response.data })
        Cookies.set(authConfig.storageTokenKeyName, response.data.token)
      })
      .catch(err => {
        toast.error(err.response.data.message)
        handleLogout()

      })
}
const initAuth = async (route) => {
  const storedToken = Cookies.get(authConfig.storageTokenKeyName)
  console.log("storedToken",storedToken)
  if (storedToken) {
    setLoading(true)
    await api
      .get(authConfig.meEndpoint, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      })
      .then(async response => {
        console.log("response.data.data",response)
        setLoading(false)
        setUser({ ...response.data })
        console.log("guyuyfgfytdfg f ffytf",route)
        
      })
      .catch(() => {
        Cookies.remove('userData')
        Cookies.remove('refreshToken')
        Cookies.remove('accessToken')
        setUser(null)
        setLoading(false)
        if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
          router.replace('/pages/auth/login-v1/')
        }
      })
  } else {
    setLoading(false)
  }
}
  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register:handleRegister,
    resetPassword: handleResetPassword,
    me: initAuth
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
