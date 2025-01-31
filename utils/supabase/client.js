import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';;
import { supabasekey, supabaseUrl } from '../../env'
import AsyncStorage from "@react-native-async-storage/async-storage";


export const supabase = createClient(supabaseUrl, supabasekey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
