import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { firebaseConfig } from '@/utils';
import { User } from 'firebase/auth';
import { type TUser } from '@/types';

type TAuthProps = {
  user: User | null; // Connected User
  // tUser: TUser | null;
  userId: string; // Connected user uid
  isLoading: boolean; // Chargement de l'utilisateur
};

// Création du contexte avec une valeur par défaut `undefined`
const Context = createContext<TAuthProps | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte d'authentification
const useAuth = () => {
  const context = useContext(Context);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
};

// Fournisseur de contexte pour gérer l'état d'authentification
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tUser, setTUser] = useState<TUser | null>(null);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseConfig.auth.onAuthStateChanged((_user) => {
      console.log(`User ${_user ? 'connected' : 'disconnected'}`);

      setUser(_user);
      setUserId(_user ? _user.uid : '');
      // setTUser(); // Need to get user from firestore with userId
      setIsLoading(isLoading ? false : true);
    });

    return () => unsubscribe();
  }, [firebaseConfig.auth]);

  return (
    <Context.Provider value={{ user, userId, isLoading }}>
      {children}
    </Context.Provider>
  );
};

// Export des composants pour une utilisation dans d'autres parties de l'application
export const AuthContext = { useAuth, AuthProvider };
