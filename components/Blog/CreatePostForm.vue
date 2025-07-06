<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8">
      {{ isEditing ? "Επεξεργασία" : "Δημιουργία" }} Blog Post
    </h1>

    <form class="space-y-6" @submit.prevent="submitPost">
      <div>
        <label for="title" class="block text-sm font-medium mb-2">Τίτλος</label>
        <UInput
          id="title"
          v-model="form.title"
          placeholder="Εισάγετε τίτλο"
          :error="errors.title"
          required
        />
      </div>

      <div>
        <label for="slug" class="block text-sm font-medium mb-2"
          >URL Slug</label
        >
        <UInput
          id="slug"
          v-model="form.slug"
          placeholder="url-friendly-title"
          :error="errors.slug"
          required
        />
        <p class="text-sm text-gray-600 mt-1">
          Θα χρησιμοποιηθεί στη διεύθυνση URL
        </p>
      </div>

      <div>
        <label for="excerpt" class="block text-sm font-medium mb-2"
          >Σύνοψη (προαιρετικό)</label
        >
        <UTextarea
          id="excerpt"
          v-model="form.excerpt"
          placeholder="Σύντομη περιγραφή του άρθρου"
          :rows="2"
        />
      </div>

      <div>
        <label for="content" class="block text-sm font-medium mb-2"
          >Περιεχόμενο</label
        >
        <div class="border rounded-lg">
          <div class="border-b bg-gray-50 p-2 flex gap-2">
            <UButton
              :class="{ 'bg-gray-200': isFormatActive('bold') }"
              type="button"
              variant="ghost"
              size="sm"
              @click="formatText('bold')"
            >
              <Icon name="lucide:bold" />
            </UButton>
            <UButton
              :class="{ 'bg-gray-200': isFormatActive('italic') }"
              type="button"
              variant="ghost"
              size="sm"
              @click="formatText('italic')"
            >
              <Icon name="lucide:italic" />
            </UButton>
            <UButton
              type="button"
              variant="ghost"
              size="sm"
              @click="formatText('heading')"
            >
              <Icon name="lucide:heading" />
            </UButton>
            <UButton
              type="button"
              variant="ghost"
              size="sm"
              @click="formatText('link')"
            >
              <Icon name="lucide:link" />
            </UButton>
          </div>
          <UTextarea
            id="content"
            ref="contentTextarea"
            v-model="form.content"
            placeholder="Γράψτε το περιεχόμενο εδώ..."
            :rows="15"
            class="border-0 resize-none"
            :error="errors.content"
            required
          />
        </div>
        <div class="mt-2 flex justify-between">
          <UButton
            type="button"
            variant="ghost"
            size="sm"
            @click="showPreview = !showPreview"
          >
            {{ showPreview ? "Απόκρυψη" : "Προεπισκόπηση" }}
          </UButton>
          <p class="text-sm text-gray-600">Υποστηρίζεται Markdown formatting</p>
        </div>
      </div>

      <!-- Preview Section -->
      <div v-if="showPreview" class="border rounded-lg p-4 bg-gray-50">
        <h3 class="text-lg font-semibold mb-4">Προεπισκόπηση</h3>
        <div class="prose max-w-none" v-html="renderedContent" />
      </div>

      <div class="flex items-center gap-4">
        <UCheckbox v-model="form.published" label="Δημοσίευση άμεσα" />
      </div>

      <div class="flex gap-4">
        <UButton
          type="submit"
          :loading="loading"
          :disabled="loading || !isFormValid"
        >
          {{
            props.isEditing
              ? form.published
                ? "Ενημέρωση & Δημοσίευση"
                : "Ενημέρωση"
              : form.published
              ? "Δημοσίευση"
              : "Αποθήκευση σε προσχέδια"
          }}
        </UButton>
        <UButton
          type="button"
          variant="outline"
          @click="$router.push('/admin/blog')"
        >
          Ακύρωση
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
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
const showPreview = ref(false);
const contentTextarea = ref<HTMLTextAreaElement>();

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

// Simple markdown renderer for preview
const renderedContent = computed(() => {
  let content = form.value.content;

  // Basic markdown parsing
  content = content
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>");

  return `<p>${content}</p>`;
});

// Text formatting functions
const formatText = (format: string) => {
  if (!contentTextarea.value) return;

  const textarea = contentTextarea.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = form.value.content.substring(start, end);

  let formattedText = "";

  switch (format) {
    case "bold":
      formattedText = `**${selectedText || "έντονο κείμενο"}**`;
      break;
    case "italic":
      formattedText = `*${selectedText || "πλάγιο κείμενο"}*`;
      break;
    case "heading":
      formattedText = `## ${selectedText || "Επικεφαλίδα"}`;
      break;
    case "link":
      formattedText = `[${
        selectedText || "κείμενο συνδέσμου"
      }](https://example.com)`;
      break;
  }

  const newContent =
    form.value.content.substring(0, start) +
    formattedText +
    form.value.content.substring(end);

  form.value.content = newContent;

  nextTick(() => {
    textarea.focus();
    textarea.setSelectionRange(
      start + formattedText.length,
      start + formattedText.length
    );
  });
};

const isFormatActive = (format: string) => {
  if (!contentTextarea.value) return false;

  const textarea = contentTextarea.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = form.value.content.substring(start, end);

  switch (format) {
    case "bold":
      return selectedText.startsWith("**") && selectedText.endsWith("**");
    case "italic":
      return (
        selectedText.startsWith("*") &&
        selectedText.endsWith("*") &&
        !selectedText.startsWith("**")
      );
    default:
      return false;
  }
};

// Utility function to create URL-friendly slugs
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

// Form submission
const submitPost = async () => {
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
