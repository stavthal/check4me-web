<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const supabase = useSupabaseClient();
const { user, setUser } = useUserStore();
const toast = useToast();
const router = useRouter();

const onLogout = () => {
  supabase.auth.signOut();
  setUser(null);
  console.log("User logged out");
  toast.add({
    title: "Logged out",
    description: "You have successfully logged out.",
    color: "success",
  });
  router.push("/login");
};

const items = computed<DropdownMenuItem[][]>(() => {
  if (!user) {
    return [];
  }

  const menuItems: DropdownMenuItem[][] = [
    [
      {
        label: user.full_name,
        avatar: {},
        type: "label",
      },
    ],
    [
      {
        label: "Dashboard",
        icon: "i-lucide-layout-dashboard",
        to:
          user.role === "admin"
            ? "/dashboard/admin"
            : user.role === "checker"
            ? "/dashboard/checker"
            : "/dashboard/client",
      },
    ],
    [
      {
        label: "Profile",
        icon: "i-lucide-user",
      },
      // {
      //   label: "Billing",
      //   icon: "i-lucide-credit-card",
      // },
      {
        label: "Settings",
        icon: "i-lucide-cog",
        kbds: [","],
      },
    ],
    [
      {
        label: "Support",
        icon: "i-lucide-life-buoy",
        to: "/components/dropdown-menu",
      },
    ],
    [
      {
        label: "Logout",
        icon: "i-lucide-log-out",
        onClick: onLogout,
      },
    ],
  ];

  return menuItems;
});
</script>

<template>
  <UDropdownMenu
    v-if="user"
    :items="items"
    :ui="{
      content: 'w-48',
    }"
  >
    <UButton
      icon="i-lucide-menu"
      color="primary"
      size="xl"
      class="border hover:bg-primary-400"
    />
  </UDropdownMenu>
  <div v-else class="flex gap-2">
    <UButton to="/login" color="primary" variant="outline" size="md">
      Login
    </UButton>
    <UButton to="/register" color="primary" size="md"> Register </UButton>
  </div>
</template>
