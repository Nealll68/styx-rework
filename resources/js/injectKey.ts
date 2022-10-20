import { InjectionKey } from 'vue'
import type { InertiaForm } from '@inertiajs/inertia-vue3'
import type { ParameterInterface } from './interfaces'

export const ProfilePageFormKey = Symbol() as InjectionKey<
  InertiaForm<{
    parameters: ParameterInterface
    server: null
    difficulty: null
    performance: null
  }>
>
