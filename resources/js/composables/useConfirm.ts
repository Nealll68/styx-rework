import { InjectionKey, reactive, ref, Ref } from '@vue/composition-api'

export interface ConfirmPropsInterface {
  type?: string,
  title: string,
  message: string,
  continueBtnText?: string,
  cancelBtnText?: string
}

interface ConfirmReturn {
  readonly show: Ref<boolean>
  componentProps: ConfirmPropsInterface
  confirm(props: ConfirmPropsInterface): Promise<boolean>
  inform(value: boolean): void
}

export const useConfirmKey: InjectionKey<(props: ConfirmPropsInterface) => Promise<boolean>> = Symbol('Confirm')

export function useConfirm(): ConfirmReturn {
  const show = ref(false)
  let holdResolve: (value: boolean) => void = () => {}
  let componentProps: ConfirmPropsInterface = reactive({
    title: '',
    message: '',
  })

  const confirm = (props: ConfirmPropsInterface): Promise<boolean> => {
    componentProps = Object.assign(componentProps, props)
    show.value = true

    return new Promise((resolve) => {
      holdResolve = resolve
    })
  }

  const inform = (value: boolean): void => {
    show.value = false
    holdResolve(value)
  }

  return {
    show,
    componentProps,
    confirm,
    inform
  } as ConfirmReturn
}
