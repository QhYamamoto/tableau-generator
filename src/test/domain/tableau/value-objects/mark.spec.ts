import { describe, test, expect } from 'vitest'
import { Mark } from '../../../../domains/tableau/value-objects/mark'

describe('testMark', () => {
  test('testValues', () => {
    let mark = new Mark()
    expect(mark.value).toBeFalsy()
    expect(mark.isShaded).toBeFalsy()

    mark = new Mark('*', true)
    expect(mark.value).toBe('*')
    expect(mark.value).toBeTruthy()
  })
})
