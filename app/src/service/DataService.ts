import { type Ref, ref } from 'vue'

export class DataService {
  private readonly baseURL = 'http://localhost:3100/v1/api'

  private static instance: DataService

  tabs: Ref<string[]> = ref([])
  tabData: Ref<any> = ref({})
  plugins: Ref<any> = ref({})

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService()
    }

    return DataService.instance
  }

  async loadData() {
    const data = await fetch(this.baseURL + '/data').then((res) => res.json())
    this.tabs.value = data.data.tabs
    this.tabData.value = data.data.tabdata
    this.plugins.value = data.data.plugins
  }

  async toggleAllPlugins(state: boolean) {
    await fetch(`${this.baseURL}/toggle/all/${state ? 'enable' : 'disable'}`, {
      method: 'POST'
    })
    await this.loadData()
  }
}
