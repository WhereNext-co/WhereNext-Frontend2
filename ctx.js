import React from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = React.createContext({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (code) => {
          confirmationResult
            .confirm(code)
            .then((result) => {
              // User signed in successfully.
              const user = result.user;
              // ...
            })
            .catch((error) => {
              // User couldn't sign in (bad verification code?)
              // ...
            });
          setSession("xxx");
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
