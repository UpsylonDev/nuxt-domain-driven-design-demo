<script setup lang="ts">
import type { User } from '@/domains/users/types'
const props = defineProps<{
  user: User
}>()
const initials = computed(() => getUserInitials(props.user))
const { t } = useI18n()
</script>

<template>

  <div class="bg-gray-100 rounded p-2 mb-5">

    <ul>

      <li>{{ t('users.name') }}: {{ user.name }}</li>

      <li>{{ t('users.email') }}: {{ user.email }}</li>

      <li>Username: {{ user.username }}</li>

      <li>Initials: {{ initials }}</li>

    </ul>

  </div>

</template>

