<script setup>
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/vue-3";

export function initializeEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p></p>",
  });

  return { editor };
}
</script>
