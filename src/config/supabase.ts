import { createClient } from '@supabase/supabase-js';

// Provide default values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Validate environment variables
const validateEnvVariables = () => {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('Supabase environment variables are missing. Using development defaults.');
  }
};

validateEnvVariables();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage bucket configuration
export const STORAGE_CONFIG = {
  MODELS_BUCKET: 'models',
  THUMBNAILS_BUCKET: 'thumbnails',
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
};

// Database tables
export const TABLES = {
  ASSETS: 'assets',
  USERS: 'users',
};