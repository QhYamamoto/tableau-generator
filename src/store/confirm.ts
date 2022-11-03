import { Ref, ref } from 'vue'

export default function useConfirmStore() {
  /* states */
  /**
   * Message to show on the confirm window
   */
  const $confirmMessage = ref('')

  /**
   * User response to confirmation
   */
  const $confirmResponse = ref(false)

  /**
   * Object of function and its arguments to be executed after confirmation
   */
  const $functionInfo: Ref<{ fn: AnyFunction; args: any }> = ref({
    fn: () => {
      return
    },
    args: undefined,
  })

  /* actions */
  /**
   * Set message to show on the confirm window
   * @param confirmMessage
   */
  const $setConfirmMessage = (confirmMessage: string) => {
    $confirmMessage.value = confirmMessage
  }

  /**
   * Set user response to confirmation
   * @param response
   */
  const $setConfirmResponse = (response: boolean) => {
    $confirmResponse.value = response
  }

  /**
   * Set function and its arguments to be executed after confirmation
   * @param fn Function to be executed with dummy arguments
   * @param args Actual arguments
   */
  const $setFunctionToExecute = (fn: AnyFunction, ...args: any) => {
    $functionInfo.value = { fn: fn, args: [...args] }
  }

  /**
   * Reset all states about confirmation
   */
  const $resetConfirmStates = () => {
    $confirmResponse.value = false
    $functionInfo.value = {
      fn: () => {
        return
      },
      args: undefined,
    }

    // Initialize value after confirm window disappears
    setTimeout(() => {
      $confirmMessage.value = ''
    }, 500)
  }

  return {
    /* states */
    $confirmMessage,
    $confirmResponse,
    $functionInfo,
    /* actions */
    $setConfirmMessage,
    $setConfirmResponse,
    $setFunctionToExecute,
    $resetConfirmStates,
  }
}

export type ConfirmStore = ReturnType<typeof useConfirmStore>
