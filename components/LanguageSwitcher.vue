<script setup lang="ts">
const { locale, locales, t } = useI18n();

const switchLanguage = (code: string) => {
  locale.value = code;
};
</script>

<template>
  <div class="flex gap-2 items-center">
    <span class="text-sm text-gray-600">{{ t('common.language') }}:</span>
    <select
      v-model="locale"
      class="border border-gray-300 rounded px-2 py-1 text-sm"
      @change="switchLanguage($event.target.value)"
    >
      <option
        v-for="availableLocale in locales"
        :key="availableLocale.code"
        :value="availableLocale.code"
      >
        {{ availableLocale.name }}
      </option>
    </select>
  </div>
</template>