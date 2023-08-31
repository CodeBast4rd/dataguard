<script setup lang="ts">
import PluginItem from '@/components/PluginItem.vue'
import { computed, ref, watch } from 'vue'
import { DataService } from '@/service/DataService'
import router from '@/router'
import type { PlainPlugin } from '@/types/PlainPlugin'

const service = DataService.getInstance()

// Create reactive references
const tabData = ref(service.tabData.value[router.currentRoute.value.name])
const plugins = ref(service.plugins)

// Watch for route changes and update tabData accordingly
watch(router.currentRoute, (newRoute) => {
  tabData.value = service.tabData.value[newRoute.name as string]
})

// Watch for route changes and update tabData accordingly
watch(service.tabData, () => {
  tabData.value = service.tabData.value[router.currentRoute.value.name]
})

const currentPlugins: PlainPlugin[] = computed(() => {
  const active = tabData.value.active.map((a) => ({ ...plugins.value[a], state: 'active' }))
  const disabled = tabData.value.disabled.map((a) => ({ ...plugins.value[a], state: 'disabled' }))
  const inactive = tabData.value.inactive.map((a) => ({ ...plugins.value[a], state: 'inactive' }))
  return [...active, ...disabled, ...inactive]
})
</script>

<template>
  <div class="tab-view-container">
    <div class="title">{{ tabData.title }} Plugins</div>
    <div class="plugins">
      <PluginItem
        class="plugin"
        v-for="plugin in currentPlugins"
        :key="plugin.title"
        :description="plugin.description"
        :state="plugin.state"
        :title="plugin.title"
      ></PluginItem>
    </div>
  </div>
</template>

<style scoped>
.tab-view-container {
  display: flex;
  flex-direction: column;
  padding: 0 2.5%;
}

.title {
  height: 6rem;
  display: flex;
  align-items: center;
  font-size: large;
}

.plugins {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
</style>
