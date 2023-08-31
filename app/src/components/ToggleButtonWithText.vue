<script setup lang="ts">
import { ref } from 'vue'
import ToggleButton from '@/components/ToggleButton.vue'
import type { PluginState } from '@/types/PluginState'
const props = defineProps<{ state: PluginState }>()

const isToggled = ref(props.state === 'active')

const toggle = (toggle: boolean) => {
  isToggled.value = toggle
}
</script>

<template>
  <div class="toggle-container">
    <ToggleButton
      :disabled="props.state === 'disabled'"
      @toggle="(newToggle) => toggle(newToggle)"
      :is-toggled="isToggled"
    ></ToggleButton>
    <span v-if="isToggled" :class="{ allowed: isToggled }">Allowed</span>
    <span v-else :class="{ blocked: !isToggled }">Blocked</span>
  </div>
</template>

<style scoped>
.toggle-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.toggle-container span {
  font-size: 0.8rem;
  padding-top: 5px;
}
span.allowed {
  color: var(--dgGreen);
}
span.blocked {
  color: var(--dgRed);
}
</style>
