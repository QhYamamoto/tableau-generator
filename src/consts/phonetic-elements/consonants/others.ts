import { DEFAULT_SEGMENTAL_ELEMENT, SONORITY } from '../utils'

const voicedLabialVelarGlide: PhoneticElement = {
  ...DEFAULT_SEGMENTAL_ELEMENT,
  name: 'voiced labial velar glide',
  category: 'other',
  symbol: 'w',
  sonority: SONORITY.GLIDE_APPROXIMANT,
  son: '+',
  cont: '+',
  voi: '+',
  LAB: '+',
  rnd: '+',
  ant: '0',
  dist: '0',
  DORS: '+',
  hi: '+',
  bk: '+',
}

export const OTHER_CONSONANTS = [voicedLabialVelarGlide]

export const OTHER_CONSONANT_SYMBOLS = OTHER_CONSONANTS.map((el) => el.symbol)
