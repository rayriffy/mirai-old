import React from 'react'
import { useAuth } from 'src/core/services/useAuth'
import { Login } from './login'

export const AppLayout: React.FC = props => {
  const { children } = props

  const auth = useAuth()

  console.log({ auth })

  return (
    <React.Fragment>
      <main className="bg-gray-50 min-h-screen">
        {auth === undefined ? (
          <div className="w-full h-screen flex justify-center items-center">
            <div className="w-8 h-8 spinner border-2" />
          </div>
        ) : auth === null ? <Login /> : children }
      </main>
    </React.Fragment>
  )
}
