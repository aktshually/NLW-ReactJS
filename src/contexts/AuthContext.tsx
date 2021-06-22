import { createContext, ReactNode, useEffect, useState } from "react"

import { auth } from "../services/firebase"
import firebase from "firebase"


type User = {
    id: string,
    name: string,
    avatar: string
}

type AuthContextType = {
    user: User | undefined,
    signInWithGoogle: () => Promise<void>
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

const AuthContextProvider = (props: AuthContextProviderProps) => {

    const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const {displayName, photoURL, uid} = user

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google account")
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
        
      }
      
      return () => {
        unsubscribe();
      }

    })

  }, []) // adiciona um listener que procura se existia algum login feito por aquele usuário


  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider)
      if (result.user) {
        const { displayName, photoURL, uid } = result.user

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google account")
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })

      }
  }


    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;