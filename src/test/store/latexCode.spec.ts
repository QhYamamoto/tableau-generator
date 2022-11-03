import { describe, test, expect } from 'vitest'
import useLatexCodeStore from '../../store/latexCode'

describe('testLatexCodeStore', () => {
  const store = useLatexCodeStore()

  test('testSetLatexCode', () => {
    const testCode = 'test code'
    store.$setLatexCode(testCode)
    expect(store.$latexCode.value).toBe(testCode)
  })
})
