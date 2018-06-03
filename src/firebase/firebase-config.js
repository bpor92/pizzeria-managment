import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyAQnTdWL1WWQfX7Aa8nE8V1q3t9KYuP2Bc',
  authDomain: 'user-auth-69ef9.firebaseapp.com',
  databaseURL: 'https://user-auth-69ef9.firebaseio.com',
  projectId: 'user-auth-69ef9',
  storageBucket: 'user-auth-69ef9.appspot.com',
  messagingSenderId: '840250076847'
}

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()

export const dbMenuRef = db.ref('Menu')
export const dbOrderRef = db.ref('Order')
