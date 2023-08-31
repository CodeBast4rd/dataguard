import { createRouter, createWebHistory } from 'vue-router'
import TabView from '@/views/TabView.vue'
import { DataService } from '@/service/DataService'
const baseURL = import.meta.env.BASE_URL

const router = createRouter({
  history: createWebHistory(baseURL),
  routes: []
})

await DataService.getInstance()
  .loadData()
  .then(() => {
    const service = DataService.getInstance()
    // Dynamically generate routes based on fetched tabs
    const routes = service.tabs.value.map((tab) => ({
      path: `/${tab}`,
      name: tab,
      component: TabView
    }))

    // Update the router with the new routes
    routes.forEach((route) => router.addRoute(route))
    router.addRoute({ path: '/', redirect: `/${DataService.getInstance().tabs[0]}` })
  })
  .catch((error) => {
    console.error('Error fetching data:', error)
  })

export default router
