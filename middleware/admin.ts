export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  console.log("Middleware: Checking user authentication and role");
  console.log("User:", user.value);

  if (!user.value) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  // If no role in metadata, try to fetch from users table
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.value.id)
    .single();

  console.log("User role from users table:", profile?.role);

  console.log("Checking if user is admin...");

  if (!profile?.role || profile.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden - Admin access required",
    });
  }
});
