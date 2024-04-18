import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);


    useEffect(() => {
        // onAuthStateChanged
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true)
                setUser(user)
                updateUserData(user.uid)
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub
    }, [])

    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({ ...user, username: data?.username, profileURL: data?.profileURL, userId: data?.userId })
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            return { success: true }
        } catch (error) {
            console.log('login error');
            let msg = error.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'Invalid Email'
            if (msg.includes('(auth/invalid-credentail)')) msg = 'Invalid credentails'
            return { success: false, msg }
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            return { success: true }
        } catch (error) {
            return { success: false, msg: error.message, error }
        }
    }

    const register = async (email, password, username, profileURL) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', response?.user?.uid), {
                username,
                profileURL,
                userId: response?.user?.uid,
                email
            })

            return { success: true, data: response?.user }
        } catch (error) {
            let msg = error.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'Invalid Email'
            if (msg.includes('(auth/email-already-in-use)')) msg = 'Email already in use'
            return { success: false, msg }
        }
    }

    return (
        <AuthContext.Provider value={{ user, logOut, login, register, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider')
    }

    return value;
}