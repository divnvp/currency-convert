<script setup>
defineProps({
  modelValue: { required: true },
  disabled: { type: Boolean },
  readOnly: { type: Boolean }
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    v-model="modelValue"
    type="number"
    :disabled="disabled"
    :readonly="readOnly"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>
