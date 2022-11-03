import { DEFAULT_VOCALIC_ELEMENT, SONORITY } from '../utils'

const highFrontUnroundedVowel: PhoneticElement = {
  ...DEFAULT_VOCALIC_ELEMENT,
  name: 'high front unrounded vowel',
  symbol: 'i',
  sonority: SONORITY.HIGH_VOWEL,
  hi: '+',
  tns: '+',
}

const highFrontRoundedVowel: PhoneticElement = {
  ...highFrontUnroundedVowel,
  name: 'high front rounded vowel',
  symbol: 'y',
  LAB: '+',
  rnd: '+',
}

const highBackUnroundedVowel: PhoneticElement = {
  ...DEFAULT_VOCALIC_ELEMENT,
  name: 'high back unrounded vowel',
  symbol: 'ɯ',
  tipa: 'W',
  sonority: SONORITY.HIGH_VOWEL,
  hi: '+',
  bk: '+',
  tns: '+',
}

const highBackRoundedVowel: PhoneticElement = {
  ...highBackUnroundedVowel,
  name: 'high back rounded vowel',
  symbol: 'u',
  LAB: '+',
  rnd: '+',
}

export const HIGH_VOWELS = [
  highFrontUnroundedVowel,
  highFrontRoundedVowel,
  highBackUnroundedVowel,
  highBackRoundedVowel,
]
