<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-6 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <UButton
              variant="ghost"
              color="neutral"
              @click="$router.push('/admin/blog')"
            >
              <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
              Επιστροφή
            </UButton>
            <div class="h-6 w-px bg-gray-300" />
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                {{ isEditing ? "Επεξεργασία" : "Δημιουργία" }} Blog Post
              </h1>
              <p class="text-sm text-gray-600">
                {{
                  isEditing
                    ? "Ενημερώστε το περιεχόμενο του άρθρου σας"
                    : "Δημιουργήστε ένα νέο άρθρο για το blog σας"
                }}
              </p>
            </div>
          </div>

          <!-- Save Actions -->
          <div class="flex items-center gap-3">
            <UButton
              variant="outline"
              :disabled="loading || !isFormValid"
              @click="submitPost(false)"
            >
              <Icon name="lucide:save" class="w-4 h-4 mr-2" />
              Αποθήκευση
            </UButton>
            <UButton
              color="primary"
              :loading="loading"
              :disabled="loading || !isFormValid"
              @click="submitPost(true)"
            >
              <Icon name="lucide:send" class="w-4 h-4 mr-2" />
              {{ isEditing ? "Ενημέρωση & Δημοσίευση" : "Δημοσίευση" }}
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Form -->
        <div class="lg:col-span-2">
          <form class="space-y-6" @submit.prevent="() => submitPost()">
            <!-- Title -->
            <div
              class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <label
                for="title"
                class="block text-sm font-semibold text-gray-900 mb-3"
              >
                <Icon name="lucide:type" class="w-4 h-4 mr-2 inline" />
                Τίτλος άρθρου
              </label>
              <UInput
                id="title"
                v-model="form.title"
                placeholder="Εισάγετε έναν ελκυστικό τίτλο..."
                :error="errors.title"
                size="xl"
                class="text-lg"
                required
              />
            </div>

            <!-- Slug -->
            <div
              class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <label
                for="slug"
                class="block text-sm font-semibold text-gray-900 mb-3"
              >
                <Icon name="lucide:link" class="w-4 h-4 mr-2 inline" />
                URL Slug
              </label>
              <UInput
                id="slug"
                v-model="form.slug"
                placeholder="url-friendly-title"
                :error="errors.slug"
                required
              />
              <p class="text-sm text-gray-500 mt-2 flex items-center">
                <Icon name="lucide:info" class="w-4 h-4 mr-1" />
                Θα εμφανίζεται στη διεύθυνση URL:
                <code class="ml-1 px-2 py-1 bg-gray-100 rounded text-primary"
                  >/blog/{{ form.slug || "your-slug" }}</code
                >
              </p>
            </div>

            <!-- Excerpt -->
            <div
              class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <label
                for="excerpt"
                class="block text-sm font-semibold text-gray-900 mb-3"
              >
                <Icon name="lucide:align-left" class="w-4 h-4 mr-2 inline" />
                Σύνοψη (προαιρετικό)
              </label>
              <UTextarea
                id="excerpt"
                v-model="form.excerpt"
                placeholder="Γράψτε μια σύντομη περιγραφή του άρθρου..."
                :rows="3"
              />
              <p class="text-sm text-gray-500 mt-2">
                Θα εμφανίζεται στη λίστα των άρθρων και στα μέσα κοινωνικής
                δικτύωσης
              </p>
            </div>

            <!-- Content -->
            <div
              class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <label
                for="content"
                class="block text-sm font-semibold text-gray-900 mb-3"
              >
                <Icon name="lucide:edit-3" class="w-4 h-4 mr-2 inline" />
                Περιεχόμενο άρθρου
              </label>
              <BlogRichTextEditor
                v-model="form.content"
                placeholder="Γράψτε το περιεχόμενό σας εδώ..."
              />
              <p class="text-sm text-gray-500 mt-3 flex items-center">
                <Icon name="lucide:wand-2" class="w-4 h-4 mr-1" />
                Χρησιμοποιήστε τη γραμμή εργαλείων για να μορφοποιήσετε το
                κείμενό σας
              </p>
            </div>
          </form>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Publish Settings -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
              <Icon name="lucide:settings" class="w-5 h-5 mr-2" />
              Ρυθμίσεις Δημοσίευσης
            </h3>

            <div class="space-y-4">
              <div
                class="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div class="flex items-center">
                  <Icon
                    :name="form.published ? 'lucide:eye' : 'lucide:eye-off'"
                    :class="
                      form.published ? 'text-emerald-600' : 'text-amber-600'
                    "
                    class="w-5 h-5 mr-3"
                  />
                  <div>
                    <div class="font-medium text-gray-900">
                      {{ form.published ? "Δημοσιευμένο" : "Προσχέδιο" }}
                    </div>
                    <div class="text-sm text-gray-600">
                      {{ form.published ? "Ορατό σε όλους" : "Μόνο σε εσάς" }}
                    </div>
                  </div>
                </div>
                <UToggle v-model="form.published" />
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
              <Icon name="lucide:zap" class="w-5 h-5 mr-2" />
              Ενέργειες
            </h3>

            <div class="space-y-3">
              <UButton
                block
                color="primary"
                size="lg"
                :loading="loading"
                :disabled="loading || !isFormValid"
                @click="submitPost(true)"
              >
                <Icon name="lucide:send" class="w-4 h-4 mr-2" />
                {{ isEditing ? "Ενημέρωση & Δημοσίευση" : "Δημοσίευση Άρθρου" }}
              </UButton>

              <UButton
                block
                variant="outline"
                :disabled="loading || !isFormValid"
                @click="submitPost(false)"
              >
                <Icon name="lucide:save" class="w-4 h-4 mr-2" />
                Αποθήκευση ως Προσχέδιο
              </UButton>

              <UButton
                block
                variant="ghost"
                color="neutral"
                @click="$router.push('/admin/blog')"
              >
                <Icon name="lucide:x" class="w-4 h-4 mr-2" />
                Ακύρωση
              </UButton>
            </div>
          </div>

          <!-- Form Validation Status -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 class="font-semibold text-gray-900 mb-4 flex items-center">
              <Icon name="lucide:check-circle" class="w-5 h-5 mr-2" />
              Κατάσταση Φόρμας
            </h3>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Τίτλος</span>
                <Icon
                  :name="form.title ? 'lucide:check' : 'lucide:x'"
                  :class="form.title ? 'text-emerald-600' : 'text-red-500'"
                  class="w-4 h-4"
                />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">URL Slug</span>
                <Icon
                  :name="form.slug ? 'lucide:check' : 'lucide:x'"
                  :class="form.slug ? 'text-emerald-600' : 'text-red-500'"
                  class="w-4 h-4"
                />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Περιεχόμενο</span>
                <Icon
                  :name="form.content ? 'lucide:check' : 'lucide:x'"
                  :class="form.content ? 'text-emerald-600' : 'text-red-500'"
                  class="w-4 h-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCreateBlogPost } from "~/composables/blog/useCreateBlogPost";
import { useUpdateBlogPost } from "~/composables/blog/useUpdateBlogPost";
import type { BlogPost } from "~/types/blog";

interface Props {
  initialData?: BlogPost | null;
  isEditing?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  initialData: null,
  isEditing: false,
});

const _emit = defineEmits<{
  submit: [];
  cancel: [];
}>();

const form = ref({
  title: props.initialData?.title || "",
  slug: props.initialData?.slug || "",
  excerpt: props.initialData?.excerpt || "",
  content: props.initialData?.content || "",
  published: props.initialData?.published || false,
});

const errors = ref({
  title: "",
  slug: "",
  content: "",
});

const loading = ref(false);

const toast = useToast();
const router = useRouter();

// Form validation
const isFormValid = computed(() => {
  return (
    form.value.title.trim() &&
    form.value.slug.trim() &&
    form.value.content.trim()
  );
});

// Auto-generate slug from title (only when creating, not editing)
watch(
  () => form.value.title,
  (newTitle) => {
    if (
      !props.isEditing &&
      (!form.value.slug || form.value.slug === slugify(form.value.title))
    ) {
      form.value.slug = slugify(newTitle);
    }
  }
);

// Utility function to create URL-friendly slugs
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

// Form submission
const submitPost = async (publishNow?: boolean) => {
  // If publishNow is provided, update the form's published status
  if (publishNow !== undefined) {
    form.value.published = publishNow;
  }

  // Reset errors
  errors.value = { title: "", slug: "", content: "" };

  // Validate form
  if (!form.value.title.trim()) {
    errors.value.title = "Ο τίτλος είναι υποχρεωτικός";
    return;
  }

  if (!form.value.slug.trim()) {
    errors.value.slug = "Το slug είναι υποχρεωτικό";
    return;
  }

  if (!form.value.content.trim()) {
    errors.value.content = "Το περιεχόμενο είναι υποχρεωτικό";
    return;
  }

  loading.value = true;

  try {
    if (props.isEditing && props.initialData) {
      // Update existing post
      await useUpdateBlogPost(props.initialData.id, {
        title: form.value.title,
        slug: form.value.slug,
        excerpt: form.value.excerpt || undefined,
        content: form.value.content,
        published: form.value.published,
      });

      toast.add({
        title: "Blog post ενημερώθηκε!",
        description: "Οι αλλαγές σας αποθηκεύτηκαν επιτυχώς.",
        color: "success",
      });
    } else {
      // Create new post
      await useCreateBlogPost({
        title: form.value.title,
        slug: form.value.slug,
        excerpt: form.value.excerpt || undefined,
        content: form.value.content,
        published: form.value.published,
      });

      toast.add({
        title: form.value.published
          ? "Blog post δημοσιεύτηκε!"
          : "Blog post αποθηκεύτηκε!",
        description: form.value.published
          ? "Το άρθρο σας είναι πλέον ορατό στο κοινό."
          : "Το άρθρο σας αποθηκεύτηκε σε προσχέδια.",
        color: "success",
      });
    }

    router.push("/admin/blog");
  } catch (error) {
    console.error(
      `Error ${props.isEditing ? "updating" : "creating"} blog post:`,
      error
    );
    toast.add({
      title: "Σφάλμα κατά την αποθήκευση",
      description: "Παρακαλώ δοκιμάστε ξανά.",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>
