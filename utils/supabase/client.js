import { createClient } from '@supabase/supabase-js'
import { supabasekey, supabaseUrl } from '../../env'

export const supabase = createClient(supabaseUrl, supabasekey)
