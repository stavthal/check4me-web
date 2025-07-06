<template>
  <div class="border rounded-lg">
    <!-- Toolbar -->
    <div class="border-b bg-gray-50 p-2 flex flex-wrap gap-1">
      <!-- Text formatting -->
      <UButton
        :class="{ 'bg-gray-200': editor?.isActive('bold') }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().toggleBold().run()"
      >
        <Icon name="lucide:bold" />
      </UButton>

      <UButton
        :class="{ 'bg-gray-200': editor?.isActive('italic') }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().toggleItalic().run()"
      >
        <Icon name="lucide:italic" />
      </UButton>

      <UButton
        :class="{ 'bg-gray-200': editor?.isActive('underline') }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().toggleUnderline().run()"
      >
        <Icon name="lucide:underline" />
      </UButton>

      <UButton
        :class="{ 'bg-gray-200': editor?.isActive('strike') }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().toggleStrike().run()"
      >
        <Icon name="lucide:strikethrough" />
      </UButton>

      <UButton
        :class="{ 'bg-gray-200': editor?.isActive('code') }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().toggleCode().run()"
      >
        <Icon name="lucide:code" />
      </UButton>

      <div class="w-px h-6 bg-gray-300 mx-1" />

      <!-- Headings -->
      <UButton
        :class="{ 'bg-gray-200': editor?.isActive('heading', { level: 1 }) }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        H1
      </UButton>

      <UButton
        :class="{ 'bg-gray-200': editor?.isActive('heading', { level: 2 }) }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        H2
      </UButton>

      <UButton
        :class="{ 'bg-gray-200': editor?.isActive('heading', { level: 3 }) }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        H3
      </UButton>

      <div class="w-px h-6 bg-gray-300 mx-1" />

      <!-- Lists -->
      <UButton
        :class="{ 'bg-gray-200': editor?.isActive('bulletList') }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().toggleBulletList().run()"
      >
        <Icon name="lucide:list" />
      </UButton>

      <UButton
        :class="{ 'bg-gray-200': editor?.isActive('orderedList') }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().toggleOrderedList().run()"
      >
        <Icon name="lucide:list-ordered" />
      </UButton>

      <div class="w-px h-6 bg-gray-300 mx-1" />

      <!-- Block elements -->
      <UButton
        :class="{ 'bg-gray-200': editor?.isActive('blockquote') }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().toggleBlockquote().run()"
      >
        <Icon name="lucide:quote" />
      </UButton>

      <UButton
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="addLink"
      >
        <Icon name="lucide:link" />
      </UButton>

      <div class="w-px h-6 bg-gray-300 mx-1" />

      <!-- Text alignment -->
      <UButton
        :class="{ 'bg-gray-200': editor?.isActive({ textAlign: 'left' }) }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().setTextAlign('left').run()"
      >
        <Icon name="lucide:align-left" />
      </UButton>

      <UButton
        :class="{ 'bg-gray-200': editor?.isActive({ textAlign: 'center' }) }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().setTextAlign('center').run()"
      >
        <Icon name="lucide:align-center" />
      </UButton>

      <UButton
        :class="{ 'bg-gray-200': editor?.isActive({ textAlign: 'right' }) }"
        :disabled="!editor"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().setTextAlign('right').run()"
      >
        <Icon name="lucide:align-right" />
      </UButton>

      <div class="w-px h-6 bg-gray-300 mx-1" />

      <!-- Undo/Redo -->
      <UButton
        :disabled="!editor || !editor.can().undo()"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().undo().run()"
      >
        <Icon name="lucide:undo" />
      </UButton>

      <UButton
        :disabled="!editor || !editor.can().redo()"
        type="button"
        variant="ghost"
        size="sm"
        @click="editor?.chain().focus().redo().run()"
      >
        <Icon name="lucide:redo" />
      </UButton>
    </div>

    <!-- Editor Content -->
    <div class="min-h-[300px] p-4">
      <EditorContent
        :editor="editor"
        class="prose prose-sm max-w-none focus:outline-none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

interface Props {
  modelValue?: string;
  placeholder?: string;
  editable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "Γράψτε το περιεχόμενό σας εδώ...",
  editable: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const editor = ref<Editor>();

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    editable: props.editable,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[250px]",
        placeholder: props.placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      emit("update:modelValue", editor.getHTML());
    },
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value && editor.value.getHTML() !== newValue) {
      editor.value.commands.setContent(newValue, false);
    }
  }
);

// Watch for editable changes
watch(
  () => props.editable,
  (newValue) => {
    if (editor.value) {
      editor.value.setEditable(newValue);
    }
  }
);

const addLink = () => {
  if (!editor.value) return;

  const url = window.prompt("Εισάγετε URL:");

  if (url) {
    editor.value
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }
};
</script>

<style>
/* Tiptap Editor Styles */
.ProseMirror {
  outline: none;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}

.ProseMirror blockquote {
  border-left: 4px solid #e5e7eb;
  margin: 1rem 0;
  padding-left: 1rem;
  color: #6b7280;
}

.ProseMirror code {
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  color: #dc2626;
  font-size: 0.875em;
  padding: 0.125rem 0.25rem;
}

.ProseMirror pre {
  background-color: #1f2937;
  border-radius: 0.5rem;
  color: #f9fafb;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas,
    "Liberation Mono", Menlo, monospace;
  padding: 1rem;
}

.ProseMirror pre code {
  background: none;
  color: inherit;
  font-size: inherit;
  padding: 0;
}

.ProseMirror ul,
.ProseMirror ol {
  padding: 0 1rem;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3 {
  line-height: 1.2;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.ProseMirror h1 {
  font-size: 1.875rem;
  font-weight: 700;
}

.ProseMirror h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

.ProseMirror h3 {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>
