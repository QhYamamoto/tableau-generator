import { DEFAULT_VOCALIC_ELEMENT, SONORITY } from '../utils'

const midCentralVowel: PhoneticElement = {
  ...DEFAULT_VOCALIC_ELEMENT,
  name: 'mid central vowel',
  symbol: 'ə',
  tipa: '\\textschwa',
  sonority: SONORITY.MID_VOWEL,
  bk: '+',
}

const nearHighFrontUnroundedVowel: PhoneticElement = {
  ...DEFAULT_VOCALIC_ELEMENT,
  name: 'near-high front unrounded vowel',
  symbol: 'ɪ',
  tipa: 'I',
  sonority: SONORITY.MID_HIGH_VOWEL,
  hi: '+',
}

const nearHighFrontRoundedVowel: PhoneticElement = {
  ...nearHighFrontUnroundedVowel,
  name: 'near-high front rounded vowel',
  symbol: 'ʏ',
  tipa: 'U',
  LAB: '+',
  rnd: '+',
}

const nearHighBackRoundedVowel: PhoneticElement = {
  ...nearHighFrontRoundedVowel,
  name: 'near-high back rounded vowel',
  symbol: 'ʊ',
  tipa: 'U',
  bk: '+',
}

const nearLowFrontUnroundedVowel: PhoneticElement = {
  ...DEFAULT_VOCALIC_ELEMENT,
  name: 'near-low front unrounded vowel',
  symbol: 'æ',
  tipa: '\\ae',
  sonority: SONORITY.MID_LOW_VOWEL,
  lo: '+',
}

const nearLowCentralUnroundedVowel: PhoneticElement = {
  ...nearLowFrontUnroundedVowel,
  name: 'near-low central unrounded vowel',
  symbol: 'ɐ',
  tipa: '5',
  bk: '+',
}

export const OTHER_VOWELS = [
  midCentralVowel,
  nearHighFrontUnroundedVowel,
  nearHighFrontRoundedVowel,
  nearHighBackRoundedVowel,
  nearLowFrontUnroundedVowel,
  nearLowCentralUnroundedVowel,
]
