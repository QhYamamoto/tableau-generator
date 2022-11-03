import { DEFAULT_VOCALIC_ELEMENT, SONORITY } from '../utils'

const midLowFrontUnroundedVowel: PhoneticElement = {
  ...DEFAULT_VOCALIC_ELEMENT,
  name: 'mid-low front unrounded vowel',
  symbol: 'ɛ',
  tipa: 'E',
  sonority: SONORITY.MID_LOW_VOWEL,
}

const midLowFrontRoundedVowel: PhoneticElement = {
  ...midLowFrontUnroundedVowel,
  name: 'mid-low front rounded vowel',
  symbol: 'œ',
  tipa: '\\oe',
  LAB: '+',
  rnd: '+',
}

const midLowBackUnroundedVowel: PhoneticElement = {
  ...DEFAULT_VOCALIC_ELEMENT,
  name: 'mid-low back unrounded vowel',
  symbol: 'ʌ',
  tipa: '2',
  sonority: SONORITY.MID_LOW_VOWEL,
  bk: '+',
}

const midLowBackRoundedVowel: PhoneticElement = {
  ...midLowBackUnroundedVowel,
  name: 'mid-low back rounded vowel',
  symbol: 'ɔ',
  tipa: 'O',
  LAB: '+',
  rnd: '+',
}

export const MID_LOW_VOWELS = [
  midLowFrontUnroundedVowel,
  midLowFrontRoundedVowel,
  midLowBackUnroundedVowel,
  midLowBackRoundedVowel,
]
