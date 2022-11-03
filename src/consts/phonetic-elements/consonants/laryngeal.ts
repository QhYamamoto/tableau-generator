import { DEFAULT_SEGMENTAL_ELEMENT, SONORITY } from '../utils'

const voicelessPharyngealFricative: PhoneticElement = {
  ...DEFAULT_SEGMENTAL_ELEMENT,
  name: 'voiceless pharyngeal fricative',
  category: 'other',
  symbol: 'ħ',
  tipa: '\\textcrh',
  sonority: SONORITY.VL_FRICATIVE,
  cons: '+',
  'lab.dent.': '0',
  ant: '0',
  dist: '0',
  DORS: '+',
  bk: '+',
}

const voicedPharyngealFricative: PhoneticElement = {
  ...voicelessPharyngealFricative,
  name: 'voiced pharyngeal fricative',
  symbol: 'ʕ',
  tipa: 'Q',
  sonority: SONORITY.VD_FRICATIVE,
  voi: '+',
}

const glottalPlosive: PhoneticElement = {
  ...DEFAULT_SEGMENTAL_ELEMENT,
  name: 'glottal plosive',
  category: 'other',
  symbol: 'ʔ',
  tipa: 'P',
  sonority: SONORITY.GL_PLOSIVE,
  ant: '0',
  dist: '0',
  hi: '0',
  lo: '0',
  bk: '0',
  tns: '0',
  'c.g.': '+',
}

const voicelessGlottalFricative: PhoneticElement = {
  ...glottalPlosive,
  name: 'voiceless glottal fricative',
  symbol: 'h',
  sonority: SONORITY.GL_FRICATIVE,
  cont: '+',
  's.g.': '+',
  'c.g.': '-',
}

const voicedGlottalFricative: PhoneticElement = {
  ...voicelessGlottalFricative,
  name: 'voiced glottal fricative',
  symbol: 'ɦ',
  tipa: 'H',
  sonority: SONORITY.GL_FRICATIVE,
  voi: '+',
}

export const LARYNGEAL_CONSONANTS = [
  voicelessPharyngealFricative,
  voicedPharyngealFricative,
  voicelessGlottalFricative,
  voicedGlottalFricative,
  glottalPlosive,
]

export const LARYNGEAL_SYMBOLS = LARYNGEAL_CONSONANTS.map((el) => el.symbol)
