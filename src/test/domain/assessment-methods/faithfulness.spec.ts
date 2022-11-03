import { describe, test, expect } from 'vitest'
import { PHONETIC_ELEMENTS } from '../../../consts/phonetic-elements'
import { FaithfulnessConstraintMethod } from '../../../domains/assessment-methods/faithfulness'
import { Candidate } from '../../../domains/tableau/value-objects/candidate'
import { Input } from '../../../domains/tableau/value-objects/input'

describe('testFaithfulnessConstraints', () => {
  const methods = FaithfulnessConstraintMethod
  const els = PHONETIC_ELEMENTS

  test('testMax', () => {
    const method = methods.assessMax
    const input = new Input('test')
    let candidate = new Candidate('test')
    let res = method(els, input, candidate)
    expect(res).toBe(0)

    candidate = new Candidate('_est')
    res = method(els, input, candidate)
    expect(res).toBe(1)
    res = method(els, input, candidate, undefined, 'voc')
    expect(res).toBe(0)
    res = method(els, input, candidate, undefined, 'cons')
    expect(res).toBe(1)

    candidate = new Candidate('__st')
    res = method(els, input, candidate)
    expect(res).toBe(2)
    res = method(els, input, candidate, undefined, 'voc')
    expect(res).toBe(1)
    res = method(els, input, candidate, undefined, 'cons')
    expect(res).toBe(1)
  })

  test('testDep', () => {
    const method = methods.assessDep
    const input = new Input('test')
    let candidate = new Candidate('test')
    let res = method(els, input, candidate)
    expect(res).toBe(0)

    candidate = new Candidate('te.s(u)t')
    res = method(els, input, candidate)
    expect(res).toBe(1)
    res = method(els, input, candidate, undefined, 'voc')
    expect(res).toBe(1)
    res = method(els, input, candidate, undefined, 'cons')
    expect(res).toBe(0)

    candidate = new Candidate('(s)te.s(u).to')
    res = method(els, input, candidate)
    expect(res).toBe(2)
    res = method(els, input, candidate, undefined, 'voc')
    expect(res).toBe(1)
    res = method(els, input, candidate, undefined, 'cons')
    expect(res).toBe(1)
  })

  test('testIdent', () => {
    const method = methods.assessIdent
    const input = new Input('test')
    let candidate = new Candidate('test')
    let res = method(els, input, candidate)
    expect(res).toBe(0)

    candidate = new Candidate('<s>est')
    res = method(els, input, candidate)
    expect(res).toBe(1)
    res = method(els, input, candidate, undefined, 'cons')
    expect(res).toBe(0)
    res = method(els, input, candidate, undefined, 'cont')
    expect(res).toBe(1)

    candidate = new Candidate('<s>e<t>t')
    res = method(els, input, candidate)
    expect(res).toBe(2)
    res = method(els, input, candidate, undefined, 'cons')
    expect(res).toBe(0)
    res = method(els, input, candidate, undefined, 'cont')
    expect(res).toBe(2)
  })

  test('testUniformity', () => {
    const method = methods.assessUniformity
    const input = new Input('{a1i2}')
    let candidate = new Candidate('a1i2')
    let res = method(els, input, candidate)
    expect(res).toBe(0)

    candidate = new Candidate('{e1,2}')
    res = method(els, input, candidate)
    expect(res).toBe(1)
  })

  test('testContiguity', () => {
    const method = methods.assessContiguity
    let input = new Input('stest')
    let candidate = new Candidate('stest')
    let res = method(els, input, candidate)
    expect(res).toBe(0)

    candidate = new Candidate('s(u).test')
    res = method(els, input, candidate)
    expect(res).toBe(1)

    candidate = new Candidate('(e)s.test')
    res = method(els, input, candidate)
    expect(res).toBe(0)

    candidate = new Candidate('s(u).test')
    res = method(els, input, candidate)
    expect(res).toBe(1)

    input = new Input('pseud-test')
    candidate = new Candidate('p(u).seud.-test')
    res = method(els, input, candidate)
    expect(res).toBe(1)

    candidate = new Candidate('(e)p.se_d.-test')
    res = method(els, input, candidate)
    expect(res).toBe(1)

    candidate = new Candidate('(e)p.se.u_.-test')
    res = method(els, input, candidate)
    expect(res).toBe(0)
  })
})
