import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (!error) {
                    setLoading(false);
                    setSession(data.session);
                    setUser(data.session.user);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchSession();
    }, [])

    return (
        <AuthContext.Provider value={{ user, session, loading, error }} >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;