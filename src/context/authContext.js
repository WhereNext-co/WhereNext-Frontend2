import { createContext, useEffect, useState, useContext } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { set } from "firebase/database";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [userToken, setUserToken] = useState(null);
  const [userUID, setUserUID] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const login = async (phone, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        phone,
        password
      );
      setUser(userCredential?.user);
      setIsAuthenticated(true);

      // Get the Firebase ID token
      const token = await userCredential.user.getIdToken();
      setUserToken(token);
      setUserUID(userCredential.user.uid);
      console.log("User token:", token);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };
  const logout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };
  const register = async (phone, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        phone,
        password
      );
      setUser(userCredential?.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userUID,
        userToken,
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error(`useAuth must be wrapped inside AuthContextProvider`);
  }
  return value;
};
