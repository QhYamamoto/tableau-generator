import { describe, test, expect } from 'vitest'
import useConfirmStore from '../../store/confirm'

const store = useConfirmStore()

describe('testCofirmStore', () => {
  test('testSetConfirmMessage', () => {
    const testMessage = 'test Message'
    store.$setConfirmMessage(testMessage)
    expect(store.$confirmMessage.value).toBe(testMessage)
  })

  test('testSetConfirmResponse', () => {
    const positiveResponse = true
    store.$setConfirmResponse(positiveResponse)
    expect(store.$confirmResponse.value).toBe(positiveResponse)

    const negativeResponse = true
    store.$setConfirmResponse(negativeResponse)
    expect(store.$confirmResponse.value).toBe(negativeResponse)
  })

  test('testSetFunctionToExecute', () => {
    const retMessage = 'test function called'
    const testArg = 'test argument'
    const testFunc = (testArg: string) => `${retMessage}, arg = ${testArg}`
    store.$setFunctionToExecute(testFunc, testArg)
    const fn = store.$functionInfo.value.fn
    const arg = store.$functionInfo.value.args
    expect(fn(arg)).toBe(`${retMessage}, arg = ${testArg}`)
  })

  test('testResetConfirmStates', () => {
    store.$resetConfirmStates()
    expect(store.$confirmResponse.value).toBe(false)

    const fn = store.$functionInfo.value.fn
    const arg = store.$functionInfo.value.args
    expect(fn(arg)).toBe(undefined)

    setTimeout(() => {
      expect(store.$confirmMessage).toBe('')
    }, 600)
  })
})
