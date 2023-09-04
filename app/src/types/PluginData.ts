import type {PlainPlugin} from "@/types/PlainPlugin";

export interface PluginData {
  [key: string]: Pick<PlainPlugin, 'title' | 'description'>
}
