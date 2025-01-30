import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { supabasekey, supabaseUrl } from '../../env'

const ExpoSecureStoreAdapter = {
    getItem: (key) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key, value) => {
        SecureStore.setItemAsync(key, value);
    },
    removeItem: (key) => {
        SecureStore.deleteItemAsync(key);
    },
};

export const supabase = createClient(supabaseUrl, supabasekey, {
    auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
