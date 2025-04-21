import { redirect } from "@sveltejs/kit";
import { supabase } from "$lib/supabase.js";

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch, url }) {
  const pathname = url.pathname;

  const publicRoutes = ["/sign-up", "/login"];

  const { data, error } = await supabase.auth.getSession();
  const session = data.session;

  if (!data.session && !publicRoutes.includes(pathname)) {
    throw redirect(307, "/sign-up");
  }

  if (data.session && publicRoutes.includes(pathname)) {
    throw redirect(307, "/home");
  }
}
