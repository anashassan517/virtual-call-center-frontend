// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import Cookies from 'js-cookie'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  useEffect(
    () => {

      if (!router.isReady) {
        return
      }
      if (auth.user === null && !Cookies.get('userData')) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/pages/auth/login-v1',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/pages/auth/login-v1')
        }
      }
      
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route,auth.user]
  )
  console.log(auth.loading,auth.user)
  if (auth.loading || auth.user === null) {
    console.log(auth.loading,auth.user)

    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
