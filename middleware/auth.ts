export default defineNuxtRouteMiddleware(async (to) => {
  // Skip auth middleware for .well-known paths (SSL certificate validation)
  if (to.path.startsWith('/.well-known/')) {
    return;
  }

  const user = useSupabaseUser();

  // if we have a user, deny access to login and register pages
  if (user.value != null && ["/login", "/register"].includes(to.path)) {
    return navigateTo("/");
  }

  // Get user role from metadata
  const role = user?.value?.user_metadata?.role || "";

  // Deny access to client and checker routes if not the appropriate role
  if (role === "client" && to.path.startsWith("/dashboard/checker")) {
    return navigateTo("/dashboard/client");
  }
  if (role === "checker" && to.path.startsWith("/dashboard/client")) {
    return navigateTo("/dashboard/checker");
  }
});
