<script setup>
defineProps({
  title: { type: String }
})
</script>

<template>
  <div class="page-slot">
    <span>{{ title }}</span>
    <slot name="body" />
  </div>
</template>

<style scoped>
.page-slot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
}
</style>
