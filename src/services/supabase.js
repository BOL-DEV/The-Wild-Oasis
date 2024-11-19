import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zqdnyimjftndgxtujvcz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxZG55aW1qZnRuZGd4dHVqdmN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMzk4ODUsImV4cCI6MjA0NjkxNTg4NX0.Dyv-_XfFnjVGCxX6qDRU9TtPaX6OrwJmQ6_Xn6uYJvQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
