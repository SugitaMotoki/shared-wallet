<template>
  <div>
    <h2>サーバーからのレスポンス</h2>
    <p v-if="pending">読み込み中...</p>
    <p v-else-if="error">エラー: {{ error.message }}</p>
    <p v-else>{{ sampleResources }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { SampleResource } from "@interface/sample-resource";

const sampleResources = ref<SampleResource[]>([]);
const error = ref<Error | null>(null);
const pending = ref(true);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:4000/sample-resources");
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    sampleResources.value = await res.json();
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
});
</script>
