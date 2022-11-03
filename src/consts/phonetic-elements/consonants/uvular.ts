import { DEFAULT_SEGMENTAL_ELEMENT, SONORITY } from '../utils'

const voicelessUvularPlosive: PhoneticElement = {
  ...DEFAULT_SEGMENTAL_ELEMENT,
  name: 'voiceless uvular plosive',
  category: 'dorsal',
  symbol: 'q',
  sonority: SONORITY.VL_PLOSIVE,
  obs: '+',
  cons: '+',
  'lab.dent.': '0',
  ant: '0',
  dist: '0',
  DORS: '+',
  bk: '+',
}

const voicedUvularPlosive: PhoneticElement = {
  ...voicelessUvularPlosive,
  name: 'voiced uvular plosive',
  symbol: 'ɢ',
  tipa: '\\;G',
  sonority: SONORITY.VD_PLOSIVE,
  voi: '+',
}

const voicelessUvularFricative: PhoneticElement = {
  ...voicelessUvularPlosive,
  name: 'voiceless uvular fricative',
  symbol: 'χ',
  tipa: 'X',
  sonority: SONORITY.VL_FRICATIVE,
  cont: '+',
}

const voicedUvularFricative: PhoneticElement = {
  ...voicelessUvularFricative,
  name: 'voiced uvular fricative',
  symbol: 'ʁ',
  tipa: 'K',
  sonority: SONORITY.VD_FRICATIVE,
  voi: '+',
}

const uvularTrill: PhoneticElement = {
  ...voicedUvularFricative,
  name: 'uvular trill',
  symbol: 'ʀ',
  tipa: '\\;R',
  sonority: SONORITY.LIQUID,
  liq: '+',
  obs: '-',
  son: '+',
  trill: '+',
}

const uvularNasal: PhoneticElement = {
  ...voicedUvularPlosive,
  name: 'uvular nasal',
  symbol: 'ɴ',
  tipa: '\\;N',
  sonority: SONORITY.NASAL,
  obs: '-',
  son: '+',
  nas: '+',
}

export const UVULAR_CONSONANTS = [
  voicelessUvularPlosive,
  voicedUvularPlosive,
  voicelessUvularFricative,
  voicedUvularFricative,
  uvularTrill,
  uvularNasal,
]

export const UVULAR_SYMBOLS = UVULAR_CONSONANTS.map((el) => el.symbol)
