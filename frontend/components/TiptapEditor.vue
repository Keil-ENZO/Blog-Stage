<template>
  <EditorContent :editor="editor" />
</template>

<script setup>
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/vue-3";

const editor = useEditor({
  extensions: [StarterKit],
  content: "<p>Hello World!</p>",
});
</script>
