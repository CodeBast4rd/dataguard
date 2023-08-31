export interface PlainPlugin {
  title: string
  description: string
  state: 'active' | 'disabled' | 'inactive'
}
