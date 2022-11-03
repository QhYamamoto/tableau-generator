import { DEFAULT_VOCALIC_ELEMENT, SONORITY } from '../utils'

const midHighFrontUnroundedVowel: PhoneticElement = {
  ...DEFAULT_VOCALIC_ELEMENT,
  name: 'mid-high front unrounded vowel',
  sonority: SONORITY.MID_HIGH_VOWEL,
  symbol: 'e',
  tns: '+',
}

const midHighFrontRoundedVowel: PhoneticElement = {
  ...midHighFrontUnroundedVowel,
  name: 'mid-high front rounded vowel',
  symbol: 'ø',
  tipa: '\\o',
  LAB: '+',
  rnd: '+',
}

const midHighBackUnroundedVowel: PhoneticElement = {
  ...DEFAULT_VOCALIC_ELEMENT,
  name: 'mid-high back unrounded vowel',
  symbol: 'ɤ',
  tipa: '7',
  sonority: SONORITY.MID_HIGH_VOWEL,
  bk: '+',
  tns: '+',
}

const midHighBackRoundedVowel: PhoneticElement = {
  ...midHighBackUnroundedVowel,
  name: 'mid-high back rounded vowel',
  symbol: 'o',
  tipa: 'o',
  LAB: '+',
  rnd: '+',
}

export const MID_HIGH_VOWELS = [
  midHighFrontUnroundedVowel,
  midHighFrontRoundedVowel,
  midHighBackUnroundedVowel,
  midHighBackRoundedVowel,
]
