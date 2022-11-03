import { DEFAULT_SEGMENTAL_ELEMENT, SONORITY } from '../utils'

const voicelessAlveolarPlosive: PhoneticElement = {
  ...DEFAULT_SEGMENTAL_ELEMENT,
  name: 'voiceless alveolar plosive',
  category: 'coronal',
  symbol: 't',
  sonority: SONORITY.VL_PLOSIVE,
  obs: '+',
  cons: '+',
  'lab.dent.': '0',
  COR: '+',
  ant: '+',
  hi: '0',
  lo: '0',
  bk: '0',
  tns: '0',
}

const voicedAlveolarPlosive: PhoneticElement = {
  ...voicelessAlveolarPlosive,
  name: 'voiced alveolar plosive',
  symbol: 'd',
  sonority: SONORITY.VD_PLOSIVE,
  voi: '+',
}

const voicelessDentalFricative: PhoneticElement = {
  ...voicelessAlveolarPlosive,
  name: 'voiceless dental fricative',
  symbol: 'θ',
  tipa: 'T',
  sonority: SONORITY.VL_FRICATIVE,
  cont: '+',
  dist: '+',
}

const voicedDentalFricative: PhoneticElement = {
  ...voicelessDentalFricative,
  name: 'voiced dental fricative',
  symbol: 'ð',
  tipa: 'D',
  sonority: SONORITY.VD_FRICATIVE,
  voi: '+',
}

const voicelessAlveolarFricative: PhoneticElement = {
  ...voicelessAlveolarPlosive,
  name: 'voiceless alveolar fricative',
  symbol: 's',
  sonority: SONORITY.VL_AFFRICATE,
  cont: '+',
  strid: '+',
}

const voicedAlveolarFricative: PhoneticElement = {
  ...voicelessAlveolarFricative,
  name: 'voiced alveolar fricative',
  symbol: 'z',
  sonority: SONORITY.VD_FRICATIVE,
  voi: '+',
}

const voicelessAlveolarAffricate: PhoneticElement = {
  ...voicelessAlveolarFricative,
  name: 'voiceless alveolar affricate',
  symbol: 'ts',
  sonority: SONORITY.VL_AFFRICATE,
  cont: '-',
  'del.rel.': '+',
}

const voicedAlveolarAffricate: PhoneticElement = {
  ...voicelessAlveolarAffricate,
  name: 'voiced alveolar affricate',
  symbol: 'dz',
  sonority: SONORITY.VD_AFFRICATE,
  voi: '+',
}

const voicelessPostalveolarFricative: PhoneticElement = {
  ...voicelessAlveolarFricative,
  name: 'voiceless postalveolar fricative',
  symbol: 'ʃ',
  tipa: 'S',
  sonority: SONORITY.VL_FRICATIVE,
  ant: '-',
  dist: '+',
}

const voicedPostalveolarFricative: PhoneticElement = {
  ...voicelessPostalveolarFricative,
  name: 'voiced postalveolar fricative',
  symbol: 'ʒ',
  tipa: 'Z',
  sonority: SONORITY.VD_FRICATIVE,
  voi: '+',
}

const voicelessPostalveolarAffricate: PhoneticElement = {
  ...voicelessPostalveolarFricative,
  name: 'voiceless postalveolar affricate',
  symbol: 'tʃ',
  tipa: 'tS',
  sonority: SONORITY.VL_AFFRICATE,
  cont: '-',
  'del.rel.': '+',
}

const voicedPostalveolarAffricate: PhoneticElement = {
  ...voicelessPostalveolarAffricate,
  name: 'voiced postalveolar affricate',
  symbol: 'dʒ',
  tipa: 'dZ',
  sonority: SONORITY.VD_AFFRICATE,
  voi: '+',
}

const voicelessAlveolarLateralFricative: PhoneticElement = {
  ...voicelessAlveolarPlosive,
  name: 'voiceless alveolar lateral fricative',
  symbol: 'ɬ',
  tipa: '\\textbeltl',
  sonority: SONORITY.VL_FRICATIVE,
  cont: '+',
  lat: '+',
}

const voicedAlveolarLateralFricative: PhoneticElement = {
  ...voicelessAlveolarLateralFricative,
  name: 'voiced alveolar lateral fricative',
  symbol: 'ɮ',
  tipa: 'textlyoghlig',
  sonority: SONORITY.VD_FRICATIVE,
  voi: '+',
}

const voicedAlveolarTrill: PhoneticElement = {
  ...voicedAlveolarPlosive,
  name: 'voiced alveolar trill',
  symbol: 'r',
  sonority: SONORITY.LIQUID,
  liq: '+',
  obs: '-',
  son: '+',
  cont: '+',
  trill: '+',
}

const voicedAlveolarFlap: PhoneticElement = {
  ...voicedAlveolarTrill,
  name: 'voiced alveolar flap',
  symbol: 'ɾ',
  tipa: 'R',
  trill: '-',
  flap: '+',
}

const alveolarNasal: PhoneticElement = {
  ...voicedAlveolarPlosive,
  name: 'alveolar nasal',
  symbol: 'n',
  sonority: SONORITY.NASAL,
  obs: '-',
  son: '+',
  nas: '+',
}

const alveolarApproximant: PhoneticElement = {
  ...voicedAlveolarPlosive,
  name: 'alveolar approximant',
  symbol: 'ɹ',
  tipa: '\\*r',
  sonority: SONORITY.HIGH_VOWEL,
  obs: '-',
  son: '+',
  cont: '+',
}

const alveolarLateralApproximant: PhoneticElement = {
  ...alveolarApproximant,
  name: 'alveolar lateral approximant',
  symbol: 'l',
  sonority: SONORITY.LIQUID,
  liq: '+',
  lat: '+',
}

export const CORONAL_CONSONANTS = [
  voicelessAlveolarPlosive,
  voicedAlveolarPlosive,
  voicelessDentalFricative,
  voicedDentalFricative,
  voicelessAlveolarFricative,
  voicedAlveolarFricative,
  voicelessAlveolarAffricate,
  voicedAlveolarAffricate,
  voicelessPostalveolarFricative,
  voicedPostalveolarFricative,
  voicelessPostalveolarAffricate,
  voicedPostalveolarAffricate,
  voicelessAlveolarLateralFricative,
  voicedAlveolarLateralFricative,
  voicedAlveolarTrill,
  voicedAlveolarFlap,
  alveolarNasal,
  alveolarApproximant,
  alveolarLateralApproximant,
]

export const CORONAL_SYMBOLS = CORONAL_CONSONANTS.map((el) => el.symbol)
