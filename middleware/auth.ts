export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();

  // Wait for user to be loaded (if needed)
  if (!user.value) {
    return navigateTo("/login");
  }

  // if we have a user, deny access to login and register pages
  if (["/login", "/register"].includes(to.path)) {
    return navigateTo("/");
  }

  // Get user role from metadata
  const role = user.value.user_metadata?.role;

  // Restrict access based on role
  if (role === "checker" && to.path.startsWith("/dashboard/client")) {
    return navigateTo("/dashboard/checker");
  }
  if (role === "client" && to.path.startsWith("/dashboard/checker")) {
    return navigateTo("/dashboard/client");
  }
});
