<script setup>
defineProps({
  path: { type: String, required: true },
  title: { type: String }
})
</script>

<template>
  <img :src="path" alt="Reverse" :title="title">
</template>
