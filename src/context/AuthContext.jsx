// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = null;
    const connectAuth = async () => {
      try {
        const [{ auth }, { onAuthStateChanged }, { db }, { doc, getDoc }] = await Promise.all([
          import('../firebase/config'),
          import('firebase/auth'),
          import('../firebase/config'),
          import('firebase/firestore'),
        ]);

        const fetchRole = async (uid) => {
          try {
            const snap = await getDoc(doc(db, 'users', uid));
            return snap.exists() ? snap.data().role || 'user' : 'user';
          } catch { return 'user'; }
        };

        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            const role = await fetchRole(firebaseUser.uid);
            setUser(firebaseUser);
            setUserRole(role);
          } else {
            setUser(null);
            setUserRole(null);
          }
          setLoading(false);
        });
      } catch (err) {
        console.warn('Firebase Auth not configured:', err.message);
        setLoading(false);
      }
    };
    connectAuth();
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  const login = async (email, password) => {
    const { auth } = await import('../firebase/config');
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email, password, name) => {
    const { auth, db } = await import('../firebase/config');
    const { createUserWithEmailAndPassword } = await import('firebase/auth');
    const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', cred.user.uid), {
      uid: cred.user.uid,
      name,
      email,
      role: 'user',
      createdAt: serverTimestamp(),
      totalInvestment: 0,
      portfolio: [],
    });
    return cred;
  };

  const loginWithGoogle = async () => {
    const { auth, db } = await import('../firebase/config');
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
    const { doc, getDoc, setDoc, serverTimestamp } = await import('firebase/firestore');
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const existing = await getDoc(doc(db, 'users', cred.user.uid));
    if (!existing.exists()) {
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        name: cred.user.displayName,
        email: cred.user.email,
        role: 'user',
        createdAt: serverTimestamp(),
        totalInvestment: 0,
        portfolio: [],
      });
    }
    return cred;
  };

  const logout = async () => {
    const { auth } = await import('../firebase/config');
    const { signOut } = await import('firebase/auth');
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{
      user,
      userRole,
      isAdmin: userRole === 'admin',
      loading,
      login,
      register,
      loginWithGoogle,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
