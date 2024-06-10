import { createContext, useEffect, useState } from "react";
import auth from "../../Firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token');
            }
        })
        return () => {
            unSubscribe()
        }
    }, [axiosPublic])

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const updateUser = (displayName, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoURL
        })
    }
    const googleLogin = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const AuthInfo = { createUser, user, loading, logOut, logIn, updateUser, googleLogin }

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;