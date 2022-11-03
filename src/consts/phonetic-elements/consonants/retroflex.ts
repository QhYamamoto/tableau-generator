import { DEFAULT_SEGMENTAL_ELEMENT, SONORITY } from '../utils'

const voicelessRetroflexPlosive: PhoneticElement = {
  ...DEFAULT_SEGMENTAL_ELEMENT,
  name: 'voiceless retroflex plosive',
  category: 'coronal',
  symbol: 'ʈ',
  tipa: '\\:t',
  sonority: SONORITY.VL_PLOSIVE,
  obs: '+',
  cons: '+',
  'lab.dent.': '0',
  COR: '+',
  hi: '0',
  lo: '0',
  bk: '0',
  tns: '0',
}

const voicedRetroflexPlosive: PhoneticElement = {
  ...voicelessRetroflexPlosive,
  name: 'voiced retroflex plosive',
  symbol: 'ɖ',
  tipa: '\\:d',
  sonority: SONORITY.VD_PLOSIVE,
  voi: '+',
}

const voicelessRetroflexFricative: PhoneticElement = {
  ...voicelessRetroflexPlosive,
  name: 'voiceless retroflex fricative',
  symbol: 'ʂ',
  tipa: '\\:s',
  sonority: SONORITY.VL_FRICATIVE,
  cont: '+',
}

const voicedRetroflexFricative: PhoneticElement = {
  ...voicelessRetroflexFricative,
  name: 'voiced retroflex fricative',
  symbol: 'ʐ',
  tipa: '\\:z',
  sonority: SONORITY.VD_FRICATIVE,
  voi: '+',
}

const retroflexFlap: PhoneticElement = {
  ...voicedRetroflexFricative,
  name: 'retroflex flap',
  obs: '-',
  symbol: 'ɽ',
  tipa: '\\:r',
  sonority: SONORITY.LIQUID,
  liq: '+',
  son: '+',
  flap: '+',
}

const retroflexNasal: PhoneticElement = {
  ...voicedRetroflexPlosive,
  name: 'retroflex nasal',
  symbol: 'ɳ',
  tipa: '\\:n',
  sonority: SONORITY.NASAL,
  obs: '-',
  son: '+',
  nas: '+',
}

const retroflexApproximant: PhoneticElement = {
  ...voicedRetroflexFricative,
  name: 'retroflex approximant',
  symbol: 'ɻ',
  tipa: '\\:R',
  sonority: SONORITY.GLIDE_APPROXIMANT,
  obs: '-',
  son: '+',
}

const retroflexLateralApproximant: PhoneticElement = {
  ...retroflexApproximant,
  name: 'retroflex lateral approximant',
  symbol: 'ɭ',
  tipa: '\\:l',
  sonority: SONORITY.LIQUID,
  liq: '+',
  lat: '+',
}

export const RETROFLEX_CONSONANTS = [
  voicelessRetroflexPlosive,
  voicedRetroflexPlosive,
  voicelessRetroflexFricative,
  voicedRetroflexFricative,
  retroflexFlap,
  retroflexNasal,
  retroflexApproximant,
  retroflexLateralApproximant,
]

export const RETROFLEX_SYMBOLS = RETROFLEX_CONSONANTS.map((el) => el.symbol)
