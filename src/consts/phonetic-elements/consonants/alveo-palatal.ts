import { DEFAULT_SEGMENTAL_ELEMENT, SONORITY } from '../utils'

const voicelessAlveoPalatalFricative: PhoneticElement = {
  ...DEFAULT_SEGMENTAL_ELEMENT,
  name: 'voiceless alveo-palatal fricative',
  category: 'other',
  symbol: 'ɕ',
  tipa: 'C',
  sonority: SONORITY.VL_FRICATIVE,
  obs: '+',
  cons: '+',
  cont: '+',
  strid: '+',
  'lab.dent.': '0',
  COR: '+',
  dist: '+',
  DORS: '+',
  hi: '+',
}

const voicedAlveoPalatalFricative: PhoneticElement = {
  ...voicelessAlveoPalatalFricative,
  name: 'voiced alveo-palatal fricative',
  sonority: SONORITY.VD_FRICATIVE,
  symbol: 'ʑ',
  tipa: '\\textctz',
  voi: '+',
}

const voicelessAlveoPalatalAffricate: PhoneticElement = {
  ...voicelessAlveoPalatalFricative,
  name: 'voiceless alveo-palatal affricate',
  symbol: 'tɕ',
  tipa: 'tC',
  sonority: SONORITY.VL_AFFRICATE,
  cont: '-',
  'del.rel.': '+',
}

const voicedAlveoPalatalAffricate: PhoneticElement = {
  ...voicelessAlveoPalatalAffricate,
  name: 'voiced alveo-palatal affricate',
  symbol: 'dʑ',
  tipa: 'd\\textctz',
  sonority: SONORITY.VD_AFFRICATE,
  voi: '+',
}

export const ALVEO_PALATAL_CONSONANTS = [
  voicelessAlveoPalatalFricative,
  voicedAlveoPalatalFricative,
  voicelessAlveoPalatalAffricate,
  voicedAlveoPalatalAffricate,
]

export const ALVEO_PALATAL_SYMBOLS = ALVEO_PALATAL_CONSONANTS.map(
  (el) => el.symbol
)
