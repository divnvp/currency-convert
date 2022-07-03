<script setup>
import { computed, onMounted, reactive, watch } from "vue";
import { fetchCurrencies } from "../network/currencies";
// Components
import CurrencySelector from "./CurrencySelector.vue";
import PageSlot from "./PageSlot.vue";
import InputField from "./InputField.vue";
import IconField from "./IconField.vue";

const state = reactive({
  currencies: {},
  currentCurrency: {
    from: {},
    to: {}
  },
  sum: 0,
  result: 0,
  userLocale: (new Intl.NumberFormat()).resolvedOptions().locale
});

const isSumAllow = computed(() =>
  Object.keys(state.currentCurrency.from).length &&
    Object.keys(state.currentCurrency.to).length
)

onMounted(async () => {
  await getCurrencies();
});

watch(() => (state.sum), (newSum) => {
  convertCurrency(Number(newSum));
});

watch(() => state.currentCurrency, (newCurrencyState) => {
  if (Object.keys(newCurrencyState.from).length && Object.keys(newCurrencyState.to).length) {
    convertCurrency(Number(state.sum));
  }
}, { deep: true });

const getCurrencies = async () => {
  try {
    state.currencies = await fetchCurrencies();
  } catch (e) {
    //
  }
}

const convertCurrency = sum => {
  state.result = 0;

  const crossCourse = state.currentCurrency.from.Value /
      state.currentCurrency.to.Value;
  state.result = sum * crossCourse;
}

const reverseCurrency = () => {
  const reversedObj = Object.values({...state.currentCurrency}).reverse();

  state.currentCurrency.from = reversedObj[0];
  state.currentCurrency.to = reversedObj[1];
}
</script>

<template>
  <div class="home">
    <PageSlot title="Откуда">
      <template #body>
        <CurrencySelector
          v-model="state.currentCurrency.from"
          :valutes="state.currencies.Valute"
        />
      </template>
    </PageSlot>

    <div class="exchange">
      <button
        :disabled="!isSumAllow"
        @click="reverseCurrency()"
        class="exchange__button"
      >
        <IconField
          path="src/assets/currency_exchange.png"
          title="Поменять местами"
          class="exchange__icon"
        />
      </button>
    </div>

    <PageSlot title="Куда">
      <template #body>
        <CurrencySelector
          v-model="state.currentCurrency.to"
          :valutes="state.currencies.Valute"
        />
      </template>
    </PageSlot>

    <PageSlot title="Сколько">
      <template #body>
        <InputField
          v-model="state.sum"
          :disabled="!isSumAllow"
        />
      </template>
    </PageSlot>

    <PageSlot title="Результат">
      <template #body>
        <InputField
          v-model="state.result"
          :read-only="true"
        />
      </template>
    </PageSlot>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.exchange {
  display: flex;
  justify-content: center;
  align-items: center;

  &__button {
    width: 3rem;
    height: 3rem;

    background-color: transparent;
    border: none;
  }

  &__icon {
    width: 2rem;
    height: 2rem;

    cursor: pointer;
  }
}
</style>
