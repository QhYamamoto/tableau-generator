import { describe, test, expect } from 'vitest'
import { PHONETIC_ELEMENTS } from '../../../consts/phonetic-elements'
import { MarkednessConstraintMethod } from '../../../domains/assessment-methods/markedness'
import { Candidate } from '../../../domains/tableau/value-objects/candidate'
import { Input } from '../../../domains/tableau/value-objects/input'

describe('testMarkednessConstraints', () => {
  const methods = MarkednessConstraintMethod
  const els = PHONETIC_ELEMENTS

  test('testOns', () => {
    const method = methods.assessOns
    const input = new Input('test')
    let candidate = new Candidate('te.s(u).t(o)')
    let res = method(els, input, candidate)
    expect(res).toBe(0)

    candidate = new Candidate('_e.s(u).t(o)')
    res = method(els, input, candidate)
    expect(res).toBe(1)

    candidate = new Candidate('_e.s(u)._(o)')
    res = method(els, input, candidate)
    expect(res).toBe(2)

    candidate = new Candidate('_e.(u)(o)')
    res = method(els, input, candidate)
    expect(res).toBe(2)

    candidate = new Candidate('_e.(u\u{032F})(o)')
    res = method(els, input, candidate)
    expect(res).toBe(2)
  })

  test('testCoda', () => {
    const method = methods.assessCoda
    const input = new Input('test')
    let candidate = new Candidate('test')
    let res = method(els, input, candidate)
    expect(res).toBe(1)

    candidate = new Candidate('te.s(u)t')
    res = method(els, input, candidate)
    expect(res).toBe(1)

    candidate = new Candidate('te.s(u).t(o)')
    res = method(els, input, candidate)
    expect(res).toBe(0)
  })

  test('testSegmentalMarkedness', () => {
    const method = methods.assessSegmentalMarkedness
    const input = new Input('test')
    const candidate = new Candidate('test')
    let targetSegment = els.find((el) => el.symbol === 't')
    let res = method(els, input, candidate, targetSegment)
    expect(res).toBe(2)

    targetSegment = els.find((el) => el.symbol === 'e')
    res = method(els, input, candidate, targetSegment)
    expect(res).toBe(1)

    targetSegment = els.find((el) => el.symbol === 's')
    res = method(els, input, candidate, targetSegment)
    expect(res).toBe(1)

    targetSegment = els.find((el) => el.symbol === 'a')
    res = method(els, input, candidate, targetSegment)
    expect(res).toBe(0)
  })

  test('testComplexity', () => {
    const method = methods.assessComplexity
    const input = new Input('test')
    let candidate = new Candidate('test')
    let res = method(els, input, candidate)
    expect(res).toBe(1)

    candidate = new Candidate('tes_')
    res = method(els, input, candidate)
    expect(res).toBe(0)

    candidate = new Candidate('(s)tes_')
    res = method(els, input, candidate)
    expect(res).toBe(1)

    candidate = new Candidate('(s)test')
    res = method(els, input, candidate)
    expect(res).toBe(1)

    candidate = new Candidate('(s)te.s(u)(s)t_')
    res = method(els, input, candidate)
    expect(res).toBe(2)
  })

  test('assessAlign', () => {
    // align left
    let method = methods.assessAlignL
    const input = new Input('test')
    let candidate = new Candidate('test')
    let res = method(els, input, candidate)
    expect(res).toBe(0)

    candidate = new Candidate('_est')
    res = method(els, input, candidate)
    expect(res).toBe(1)

    candidate = new Candidate('(s)test')
    res = method(els, input, candidate)
    expect(res).toBe(1)

    // align right
    method = methods.assessAlignR
    candidate = new Candidate('test')
    res = method(els, input, candidate)
    expect(res).toBe(0)

    candidate = new Candidate('tes_')
    res = method(els, input, candidate)
    expect(res).toBe(1)

    candidate = new Candidate('te.s(u).t(o)')
    res = method(els, input, candidate)
    expect(res).toBe(1)
  })

  test('testPositiveFeaturalMarkedness', () => {
    const method = methods.assessPositiveFeaturalMarkedness
    const input = new Input('test')
    const candidate = new Candidate('test')
    let res = method(els, input, candidate, undefined, 'c.g.')
    expect(res).toBe(0)

    res = method(els, input, candidate, undefined, 'voc')
    expect(res).toBe(1)

    res = method(els, input, candidate, undefined, 'cont')
    expect(res).toBe(2)

    res = method(els, input, candidate, undefined, 'obs')
    expect(res).toBe(3)
  })

  test('testNegativeFeaturalMarkedness', () => {
    const method = methods.assessNegativeFeaturalMarkedness
    const input = new Input('test')
    const candidate = new Candidate('test')
    let res = method(els, input, candidate, undefined, 'tns')
    expect(res).toBe(0)

    res = method(els, input, candidate, undefined, 'voc')
    expect(res).toBe(3)

    res = method(els, input, candidate, undefined, 'cont')
    expect(res).toBe(2)

    res = method(els, input, candidate, undefined, 'obs')
    expect(res).toBe(1)
  })

  test('testSSP', () => {
    const method = methods.assessSSP
    const input = new Input('test')
    let candidate = new Candidate('test')
    let res = method(els, input, candidate)
    expect(res).toBe(0)

    candidate = new Candidate('(s)test')
    res = method(els, input, candidate)
    expect(res).toBe(1)

    candidate = new Candidate('tes<m>')
    res = method(els, input, candidate)
    expect(res).toBe(1)

    candidate = new Candidate('(s)tes<m>')
    res = method(els, input, candidate)
    expect(res).toBe(2)
  })

  test('testNoDiph', () => {
    const method = methods.assessNoDiph
    const input = new Input('test')
    let candidate = new Candidate('test')
    let res = method(els, input, candidate)
    expect(res).toBe(0)

    candidate = new Candidate('te(i)st')
    res = method(els, input, candidate)
    expect(res).toBe(1)
  })
})
