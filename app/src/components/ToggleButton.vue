<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (event: 'toggle', state: boolean): void
}>()
const props = defineProps<{ isToggled: boolean; disabled?: boolean }>()
const isToggled = ref(props.isToggled)

const toggle = () => {
  isToggled.value = !isToggled.value
  emit('toggle', isToggled.value)
}
</script>

<template>
  <div :class="['toggle-button', { on: isToggled, disabled: props.disabled }]" @click="toggle">
    <div :class="'toggle-circle'"></div>
  </div>
</template>

<style scoped>
.toggle-button {
  width: 50px;
  height: 25px;
  background-color: var(--dgRed);
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-button.disabled {
  cursor: not-allowed;
  pointer-events: none;
}

.toggle-button .toggle-circle {
  width: 22px;
  height: 22px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 2px;
  transition: left 0.3s;
}

.toggle-button.on {
  background-color: var(--dgGreen);
}

.toggle-button.on .toggle-circle {
  left: 25px;
}
</style>
