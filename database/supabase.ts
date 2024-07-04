import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const getEnv = (key: string): string => {
  return process.env[key] || "";
};

// Create a single supabase client for interacting with your database
export const supabaseJsClient = createClient<Database>(
  getEnv("SUPABASE_URL"),
  getEnv("SUPABASE_KEY")
);
