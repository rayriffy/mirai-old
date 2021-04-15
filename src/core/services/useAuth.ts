import { useEffect, useState } from 'react'

import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { createFirebaseInstance } from './createFirebaseInstance'

export const useAuth = (): User | null | undefined=> {
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    const instance = createFirebaseInstance()

    const listener = onAuthStateChanged(getAuth(instance), res => {
      setUser(res)
    })

    return () => listener()
  }, [])

  return user
}
