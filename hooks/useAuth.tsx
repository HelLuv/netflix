import * as React from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from "@firebase/auth";
import {useRouter} from "next/router";
import {auth} from "../firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = React.createContext<IAuth>({
  user: null,
  signIn: async () => {
  },
  signUp: async () => {
  },
  logout: async () => {
  },
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [initialLoading, setInitialLoading] = React.useState(true);

  React.useEffect(() => onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(true);
      router.push("login");
    }

    setInitialLoading(false);
  }), [auth]);

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
      })
      .catch((error) => {
        setError(error);
        alert(error?.message);
      })
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
      })
      .catch((error) => {
        setError(error);
        alert(error?.message);
      })
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        setError(error)
        alert(error.message);
      })
      .finally(() => setLoading(false));
  };

  const memoizedValue = React.useMemo<IAuth>(() => ({
    user,
    signUp,
    loading,
    error,
    logout,
    signIn
  }), [user, loading, error]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
};

export default function useAuth() {
  return React.useContext(AuthContext);
};