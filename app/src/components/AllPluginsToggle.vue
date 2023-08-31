<script setup lang="ts">
import { ref } from 'vue'
import ToggleButton from '@/components/ToggleButton.vue'
import { DataService } from '@/service/DataService'

const isToggled = ref(true)

const toggle = async (state: boolean) => {
  isToggled.value = state
  await DataService.getInstance().toggleAllPlugins(state)
}
</script>

<template>
  <div class="all-plugins-toggle-container" :class="{ enabled: isToggled }">
    <span v-if="isToggled">All plugins enabled</span>
    <span v-else>All plugins disabled</span>
    <ToggleButton :is-toggled="isToggled" @toggle="(state) => toggle(state)" />
  </div>
</template>

<style scoped>
.all-plugins-toggle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6rem;
  position: relative;
  background: linear-gradient(to top, var(--dgRed) -20%, transparent 50%);
}
span {
  margin-right: 2rem;
}
.all-plugins-toggle-container.enabled {
  background: linear-gradient(to top, var(--dgGreen) -20%, transparent 50%);
}
</style>
