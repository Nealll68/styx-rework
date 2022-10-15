import { InjectionKey } from 'vue'

export const saveProfileKey = Symbol() as InjectionKey<() => Promise<void>>
