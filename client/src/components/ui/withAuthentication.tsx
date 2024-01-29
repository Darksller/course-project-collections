import { useNavigate } from '@tanstack/react-router'
import { ComponentType, FC } from 'react'

const withAuthentication =
  <P extends any>(Component: ComponentType<P>): FC<P> =>
  (props) => {
    const navigate = useNavigate()
    const isAuthenticated = localStorage.getItem('access.token') as string
    if (isAuthenticated) {
      return <Component {...props} />
    }
    return <navigate to={''} />
  }

export default withAuthentication
