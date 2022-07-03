<script setup>
import { ref, watch } from "vue";

const { valutes } = defineProps({
  modelValue: { required: true },
  valutes: { required: true },
});
const emit = defineEmits(["update:modelValue"]);

const selectModel = ref({});

watch(() => selectModel, (newValue) => {
  emit("update:modelValue", newValue);
}, { deep: true });

const getCurrencyName = currency => {
  return `${currency.CharCode} ${currency.Name}`;
}
</script>

<template>
  <select v-model="selectModel">
    <option
      v-for="currency in valutes"
      :key="currency.ID"
      :value="currency"
    >
      {{ getCurrencyName(currency) }}
    </option>
  </select>
</template>
