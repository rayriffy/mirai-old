import { initializeApp, getApp, getApps } from 'firebase/app'

export const createFirebaseInstance = () => {
  const appInstance = !getApps().length
    ? initializeApp({
        apiKey: 'AIzaSyAQ516HTSiKl6HYJGIDb1wJCn5zR47dfMc',
        authDomain: 'mirai-8379a.firebaseapp.com',
        projectId: 'mirai-8379a',
        storageBucket: 'mirai-8379a.appspot.com',
        messagingSenderId: '1097205562744',
        appId: '1:1097205562744:web:2d6650ac6bd52d0e271c8d',
        measurementId: 'G-SGBWR9GSQP',
      })
    : getApp()

  return appInstance
}
