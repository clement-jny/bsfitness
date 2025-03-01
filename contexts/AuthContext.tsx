import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { firebaseConfig } from '@/utils';

type TAuthProps = {
  isAuthenticated: boolean;
  authUid: string | undefined;
};

const Context = createContext<TAuthProps>({
  isAuthenticated: false,
  authUid: undefined,
});

const useAuth = () => {
  const context = useContext(Context);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUid, setAuthUid] = useState<string | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = firebaseConfig.auth.onAuthStateChanged((_user) => {
      console.log(`User ${_user ? 'connected' : 'disconnected'}`);

      if (_user) {
        setIsAuthenticated(true);
        setAuthUid(_user.uid);
      } else {
        setIsAuthenticated(false);
        setAuthUid(undefined);
      }
    });

    return () => unsubscribe();
  }, [firebaseConfig.auth]);

  return (
    <Context.Provider value={{ authUid, isAuthenticated }}>
      {children}
    </Context.Provider>
  );
};

export const AuthContext = { useAuth, AuthProvider };
