<script setup lang="ts">
import ToggleButtonWithText from '@/components/ToggleButtonWithText.vue'
import type { PluginState } from '@/types/PluginState'

const props = defineProps<{ title: string; description: string; state: PluginState }>()
</script>

<template>
  <div class="plugin-container" :class="{ disabled: props.state === 'disabled' }">
    <div class="plugin-container-header">
      <div class="title">{{ props.title }}</div>
      <ToggleButtonWithText :state="props.state"></ToggleButtonWithText>
    </div>
    <div class="description">{{ props.description }}</div>
  </div>
</template>

<style scoped>
.plugin-container {
  display: flex;
  flex-direction: column;
  border: #dddddd 2px solid;
  border-radius: 10px;
  width: 20vw;
  padding: 1rem;
  height: 8rem;
}

.disabled {
  opacity: 0.5;
}

.plugin-container-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 35%;
}

.title {
  font-size: large;
  height: 3rem;
}

.description {
  color: var(--dgGray);
  line-height: 1.2;
  font-weight: lighter;
  width: 80%;
}
</style>
