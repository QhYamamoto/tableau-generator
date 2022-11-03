import { DEFAULT_SEGMENTAL_ELEMENT, SONORITY } from '../utils'

const voicelessPalatalPlosive: PhoneticElement = {
  ...DEFAULT_SEGMENTAL_ELEMENT,
  name: 'voiceless palatal plosive',
  category: 'dorsal',
  symbol: 'c',
  sonority: SONORITY.VL_PLOSIVE,
  obs: '+',
  cons: '+',
  'lab.dent.': '0',
  COR: '+',
  dist: '+',
  DORS: '+',
  hi: '+',
}

const voicedPalatalPlosive: PhoneticElement = {
  ...voicelessPalatalPlosive,
  name: 'voiced palatal plosive',
  symbol: 'ɟ',
  tipa: '\\textbardotlessj',
  sonority: SONORITY.VD_PLOSIVE,
  voi: '+',
}

const voicelessPalatalFricative: PhoneticElement = {
  ...voicelessPalatalPlosive,
  name: 'voiceless palatal fricative',
  sonority: SONORITY.VL_FRICATIVE,
  symbol: 'ç',
  tipa: '\\c{c}',
  cont: '+',
}

const voicedPalatalFricative: PhoneticElement = {
  ...voicelessPalatalFricative,
  name: 'voiced palatal fricative',
  symbol: 'ʝ',
  tipa: 'J',
  sonority: SONORITY.VD_FRICATIVE,
  voi: '+',
}

const palatalNasal: PhoneticElement = {
  ...voicedPalatalPlosive,
  name: 'palatal nasal',
  symbol: 'ɲ',
  tipa: '\\textltailn',
  sonority: SONORITY.NASAL,
  obs: '-',
  son: '+',
  nas: '+',
}

const palatalApproximant: PhoneticElement = {
  ...voicedPalatalFricative,
  name: 'palatal approximant',
  symbol: 'j',
  sonority: SONORITY.GLIDE_APPROXIMANT,
  obs: '-',
  son: '+',
}

const palatalLateralApproximant: PhoneticElement = {
  ...palatalApproximant,
  name: 'palatal lateral approximant',
  symbol: 'ʎ',
  tipa: 'L',
  sonority: SONORITY.LIQUID,
  liq: '+',
  lat: '+',
}

export const PALATAL_CONSONANTS = [
  voicelessPalatalPlosive,
  voicedPalatalPlosive,
  voicelessPalatalFricative,
  voicedPalatalFricative,
  palatalNasal,
  palatalApproximant,
  palatalLateralApproximant,
]

export const PALATAL_SYMBOLS = PALATAL_CONSONANTS.map((el) => el.symbol)
