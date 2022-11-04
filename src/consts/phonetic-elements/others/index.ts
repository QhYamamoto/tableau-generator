import { DEFAULT_NON_SOUND_ELEMENT } from '../utils'

// instructionページに表示するには、'for', 'usage', 'example'プロパティ等に値を付与すること (cf. phonetic-elements/types.d.ts L75~)
// example内で下付き文字として表示したい文字列(substrとする)は'| __substr |'と表記すること

const getIndexObjects = (): NonSoundElement[] => {
  const indexObjects: NonSoundElement[] = []
  // Numbers
  for (let i = 0; i < 10; i++) {
    indexObjects.push({
      ...DEFAULT_NON_SOUND_ELEMENT,
      name: `index${i}`,
      type: 'index',
      symbol: i.toString(),
    })
  }

  // Delimiter(,)
  indexObjects.push({
    ...DEFAULT_NON_SOUND_ELEMENT,
    name: `index-border`,
    type: 'index',
    symbol: ',',
    for: 'both',
    label: '1, 2, ...9',
    usage: 'Indicates index of an element.',
    exampleForInput:
      'k{a1i2}t → / ka | __1 | i | __2 | t /\n(Candidate example: k{eː | __1,2 | }t → [ keː | __1,2 | t ])',
    exampleForCandidate:
      'k{eː1,2}t → [ keː | __1,2 | t ]\nk{a1i2}t → [ ka | __1 | i | __2 | t ]\n(Input example: k{a | __1 | i | __2 | }t → / ka | __1 | i | __2 | t /)',
  })

  return indexObjects
}

export const NON_SOUND_ELEMENTS: NonSoundElement[] = [
  {
    ...DEFAULT_NON_SOUND_ELEMENT,
    name: 'syllable border',
    type: 'syllable-border',
    symbol: '.',
    for: 'candidate',
    usage: 'Corresponds to a syllable border.',
    example: 'ka.ta → [ka.ta]',
  },
  {
    ...DEFAULT_NON_SOUND_ELEMENT,
    name: 'morpheme border',
    type: 'morpheme-border',
    symbol: '-',
    for: 'both',
    usage: 'Corresponds to a morpheme border.',
    exampleForInput: 'ʌn-hæpi → / ʌn-hæpi /',
    exampleForCandidate: 'ʌn.-hæ.pi → [ ʌn.-hæ.pi ]',
  },
  {
    ...DEFAULT_NON_SOUND_ELEMENT,
    name: 'deleted segment',
    type: 'deleted-segment',
    symbol: '_',
    for: 'candidate',
    usage: 'Indicates deletion of an element.',
    example: '_a.ka → [ a.ka ]\n(Input example: /taka/)',
  },
  {
    ...DEFAULT_NON_SOUND_ELEMENT,
    name: 'insertion start',
    type: 'insertion-start',
    symbol: '(',
    for: 'candidate',
    label: '()',
    usage: 'Indicates an inserted element.',
    example: 'te.s(u).t(o) → [ te.su.to ]',
  },
  {
    ...DEFAULT_NON_SOUND_ELEMENT,
    name: 'insertion end',
    type: 'insertion-end',
    symbol: ')',
  },
  {
    ...DEFAULT_NON_SOUND_ELEMENT,
    name: 'mutation start',
    type: 'mutation-start',
    symbol: '<',
    for: 'candidate',
    label: '<>',
    usage: 'Indicates an element where phonological change has occurred.',
    example: '<d>a<g>a → [ daga ]\n(Input example: / taka /)',
  },
  {
    ...DEFAULT_NON_SOUND_ELEMENT,
    name: 'mutation start',
    type: 'mutation-end',
    symbol: '>',
  },
  {
    ...DEFAULT_NON_SOUND_ELEMENT,
    name: 'coalescence start',
    type: 'coalescence-start',
    symbol: '{',
    for: 'both',
    label: '{}',
    usageForInput:
      'Indicates elements which coalesce in at least one of the corresponding Candidates.',
    usageForCandidate:
      "Indicates elements which possibly coalesce. \n(Note that if Input's value contains these symbols, all Candidates' values should contain corresponding ones even if coalescence does'nt take place.)",
    exampleForInput:
      'k{ai}t → / kait /\n(Candidate example: k{eː}t → [ keːt ])',
    exampleForCandidate:
      'k{eː}t → [ keːt ]\nk{ai}t → [ kait ]\n(Input example: k{ai}t → / kait /)',
  },
  {
    ...DEFAULT_NON_SOUND_ELEMENT,
    name: 'coalescence end',
    type: 'coalescence-end',
    symbol: '}',
  },
  ...getIndexObjects(),
]
