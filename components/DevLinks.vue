<template>
  <DevOnly>
    <!-- Trigger Button -->
    <button
      class="dev-trigger-btn"
      title="Open Dev Links"
      @click="isModalOpen = true"
    >
      🔧
    </button>

    <!-- Modal Overlay -->
    <div v-if="isModalOpen" class="modal-overlay" @click="isModalOpen = false">
      <!-- Modal Content -->
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="devlinks-header">DEV LINKS</h2>
          <button class="close-btn" title="Close" @click="isModalOpen = false">
            ✕
          </button>
        </div>

        <div class="devlinks-div">
          <div class="links-section">
            <NuxtLink to="/register" @click="isModalOpen = false"
              >Register</NuxtLink
            >
            <NuxtLink to="/login" @click="isModalOpen = false">Login</NuxtLink>
            <NuxtLink to="/dashboard/client" @click="isModalOpen = false"
              >Client Dashboard</NuxtLink
            >
            <NuxtLink to="/dashboard/checker" @click="isModalOpen = false"
              >Checker Dashboard</NuxtLink
            >
            <NuxtLink to="/blog" @click="isModalOpen = false">Blog</NuxtLink>
          </div>

          <div class="links-section">
            <h3 class="devlinks-subheader">Admin only</h3>
            <NuxtLink to="/admin/blog" @click="isModalOpen = false"
              >Blog Management</NuxtLink
            >
            <NuxtLink to="/admin/blog/create" @click="isModalOpen = false"
              >Create Blog Post</NuxtLink
            >
            <NuxtLink to="/admin/blog/preview/1" @click="isModalOpen = false"
              >Preview Blog Post</NuxtLink
            >
          </div>

          <div class="actions-section">
            <UButton @click="onLogout">Logout</UButton>
          </div>
        </div>
      </div>
    </div>
  </DevOnly>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const isModalOpen = ref(false);

const onLogout = async () => {
  console.log("Logging out...");
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out:", error.message);
  } else {
    console.log("Logged out successfully");
    isModalOpen.value = false;
    // Optionally, redirect to the login page or home page
    useRouter().push("/login");
  }
};
// definePageMeta({ middleware: "auth" });
</script>

<style scoped>
/* Trigger Button - positioned at top right */
.dev-trigger-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.dev-trigger-btn:hover {
  background-color: #2563eb;
  transform: scale(1.05);
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

/* Modal Content */
.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 400px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #f3f4f6;
  color: #374151;
}

/* Links Container */
.devlinks-div {
  padding: 20px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.links-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.actions-section {
  display: flex;
  justify-content: center;
  padding-top: 8px;
  border-top: 1px solid #e5e7eb;
}

/* Headers */
.devlinks-header {
  color: #1d4ed8;
  font-weight: bold;
  font-size: 18px;
  margin: 0;
}

.devlinks-subheader {
  color: #dc2626;
  font-weight: 600;
  font-size: 14px;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Links */
.links-section a {
  color: #374151;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.links-section a:hover {
  background-color: #f3f4f6;
  color: #1d4ed8;
  border-color: #e5e7eb;
}
</style>
