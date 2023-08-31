<script setup lang="ts">
import LogoDataGuard from '@/components/LogoDataGuard.vue'
import SideBarButton from '@/components/SideBarButton.vue'
import { DataService } from '@/service/DataService'
import AllPluginsToggle from '@/components/AllPluginsToggle.vue'
import { ref } from 'vue'
const service = DataService.getInstance()

// Create reactive references
const tabs = ref(service.tabs)
const tabData = ref(service.tabData)
</script>

<template>
  <div class="container">
    <LogoDataGuard></LogoDataGuard>
    <SideBarButton
      v-for="tab in tabs"
      :key="tab"
      :route="tab"
      :icon="tabData[tab].icon"
      :title="tabData[tab].title"
      :to="`/${tab}`"
    />
    <div class="flex-grow"></div>
    <AllPluginsToggle></AllPluginsToggle>
  </div>
</template>

<style scoped>
.container {
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  width: 20vw;
}
.flex-grow {
  flex-grow: 1;
}
logo-data-guard {
  padding: 20px;
}
</style>
