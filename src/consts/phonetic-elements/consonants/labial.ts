import { DEFAULT_SEGMENTAL_ELEMENT, SONORITY } from '../utils'

const voicelessBilabialPlosive: PhoneticElement = {
  ...DEFAULT_SEGMENTAL_ELEMENT,
  name: 'voiceless bilabial plosive',
  category: 'labial',
  symbol: 'p',
  sonority: SONORITY.VL_PLOSIVE,
  obs: '+',
  cons: '+',
  LAB: '+',
  ant: '0',
  dist: '0',
  hi: '0',
  lo: '0',
  bk: '0',
  tns: '0',
}

const voicedBilabialPlosive: PhoneticElement = {
  ...voicelessBilabialPlosive,
  name: 'voiced bilabial plosive',
  symbol: 'b',
  sonority: SONORITY.VD_PLOSIVE,
  voi: '+',
}

const voicelessBilabialFricative: PhoneticElement = {
  ...voicelessBilabialPlosive,
  name: 'voiceless bilabial fricative',
  symbol: 'ɸ',
  tipa: 'F',
  sonority: SONORITY.VL_FRICATIVE,
  cont: '+',
}

const voicedBilabialFricative: PhoneticElement = {
  ...voicelessBilabialFricative,
  name: 'voiced bilabial fricative',
  symbol: 'β',
  tipa: 'B',
  sonority: SONORITY.VD_FRICATIVE,
  voi: '+',
}

const voicelessLabiodentalFricative: PhoneticElement = {
  ...voicelessBilabialFricative,
  name: 'voiceless labiodental fricative',
  symbol: 'f',
  sonority: SONORITY.VL_FRICATIVE,
  'lab.dent.': '+',
}

const voicedLabiodentalFricative: PhoneticElement = {
  ...voicelessLabiodentalFricative,
  name: 'voiced labiodental fricative',
  symbol: 'v',
  sonority: SONORITY.VD_FRICATIVE,
  voi: '+',
}

const bilabialTrill: PhoneticElement = {
  ...voicedBilabialFricative,
  name: 'bilabial trill',
  symbol: 'ʙ',
  tipa: '\\;B',
  sonority: SONORITY.LIQUID,
  obs: '-',
  son: '+',
  trill: '+',
}

/* const LABIODENTAL_FLAP: PhoneticElement = {
  ...voicedLabiodentalFricative,
  name: 'labiodental flap',
  symbol: 'ⱱ',
  sonority: SONORITY.LIQUID,
  obs: '-',
  son: '+',
  flap: '+',
} */

const bilabialNasal: PhoneticElement = {
  ...voicedBilabialPlosive,
  name: 'bilabial nasal',
  symbol: 'm',
  sonority: SONORITY.NASAL,
  obs: '-',
  son: '+',
  nas: '+',
}

const labiodentalNasal: PhoneticElement = {
  ...bilabialNasal,
  name: 'labiodental nasal',
  symbol: 'ɱ',
  tipa: 'M',
  sonority: SONORITY.NASAL,
  'lab.dent.': '+',
}

const labiodentalApproximant: PhoneticElement = {
  ...voicedLabiodentalFricative,
  name: 'labiodental approximant',
  symbol: 'ʋ',
  tipa: 'V',
  sonority: SONORITY.GLIDE_APPROXIMANT,
  obs: '-',
  son: '+',
}

export const LABIAL_CONSONANTS = [
  voicelessBilabialPlosive,
  voicedBilabialPlosive,
  voicelessBilabialFricative,
  voicedBilabialFricative,
  voicelessLabiodentalFricative,
  voicedLabiodentalFricative,
  bilabialTrill,
  // LABIODENTAL_FLAP,
  bilabialNasal,
  labiodentalNasal,
  labiodentalApproximant,
]

export const LABIAL_SYMBOLS = LABIAL_CONSONANTS.map((el) => el.symbol)
