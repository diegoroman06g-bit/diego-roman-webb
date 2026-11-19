import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { persistSession: false } }
);

export const BUCKET = "fotos";

export function esAdmin(req) {
  const clave = process.env.ADMIN_PASSWORD;
  return Boolean(clave) && req.headers["x-admin-password"] === clave;
}