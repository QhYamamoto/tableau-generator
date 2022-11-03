import { DEFAULT_SEGMENTAL_ELEMENT, SONORITY } from '../utils'

const voicelessVelarPlosive: PhoneticElement = {
  ...DEFAULT_SEGMENTAL_ELEMENT,
  name: 'voiceless velar plosive',
  category: 'dorsal',
  symbol: 'k',
  sonority: SONORITY.VL_PLOSIVE,
  obs: '+',
  cons: '+',
  'lab.dent.': '0',
  ant: '0',
  dist: '0',
  DORS: '+',
  hi: '+',
  bk: '+',
}

const voicedVelarPlosive: PhoneticElement = {
  ...voicelessVelarPlosive,
  name: 'voiced velar plosive',
  symbol: 'g',
  sonority: SONORITY.VD_PLOSIVE,
  voi: '+',
}

const voicelessVelarFricative: PhoneticElement = {
  ...voicelessVelarPlosive,
  name: 'voiceless velar fricative',
  symbol: 'x',
  sonority: SONORITY.VL_FRICATIVE,
  cont: '+',
}

const voicedVelarFricative: PhoneticElement = {
  ...voicelessVelarFricative,
  name: 'voiced velar fricative',
  symbol: 'ɣ',
  tipa: 'G',
  sonority: SONORITY.VD_FRICATIVE,
  voi: '+',
}

const velarNasal: PhoneticElement = {
  ...voicedVelarPlosive,
  name: 'velar nasal',
  symbol: 'ŋ',
  tipa: 'N',
  sonority: SONORITY.NASAL,
  obs: '-',
  son: '+',
  nas: '+',
}

const velarApproximant: PhoneticElement = {
  ...voicedVelarFricative,
  name: 'velar approximant',
  symbol: 'ɰ',
  tipa: '\\textturnmrleg',
  sonority: SONORITY.GLIDE_APPROXIMANT,
  obs: '-',
  son: '+',
}

const velarLateralApproximant: PhoneticElement = {
  ...velarApproximant,
  name: 'velar lateral approximant',
  symbol: 'ʟ',
  tipa: '\\;L',
  sonority: SONORITY.LIQUID,
  liq: '+',
  lat: '+',
}

export const VELAR_CONSONANTS = [
  voicelessVelarPlosive,
  voicedVelarPlosive,
  voicelessVelarFricative,
  voicedVelarFricative,
  velarNasal,
  velarApproximant,
  velarLateralApproximant,
]

export const VELAR_SYMBOLS = VELAR_CONSONANTS.map((el) => el.symbol)
