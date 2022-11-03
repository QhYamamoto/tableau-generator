import { DEFAULT_VOCALIC_ELEMENT, SONORITY } from '../utils'

const lowFrontUnroundedVowel: PhoneticElement = {
  ...DEFAULT_VOCALIC_ELEMENT,
  name: 'low front unrounded vowel',
  sonority: SONORITY.LOW_VOWEL,
  symbol: 'a',
  lo: '+',
  tns: '+',
}

const lowFrontRoundedVowel: PhoneticElement = {
  ...lowFrontUnroundedVowel,
  name: 'low front rounded vowel',
  symbol: 'ɶ',
  tipa: 'OE',
  LAB: '+',
  rnd: '+',
}

const lowBackUnroundedVowel: PhoneticElement = {
  ...DEFAULT_VOCALIC_ELEMENT,
  name: 'low back unrounded vowel',
  symbol: 'ɑ',
  tipa: 'A',
  sonority: SONORITY.LOW_VOWEL,
  lo: '+',
  bk: '+',
  tns: '+',
}

const lowBackRoundedVowel: PhoneticElement = {
  ...lowBackUnroundedVowel,
  name: 'low back rounded vowel',
  symbol: 'ɒ',
  tipa: '6',
  LAB: '+',
  rnd: '+',
}

export const LOW_VOWELS = [
  lowFrontUnroundedVowel,
  lowFrontRoundedVowel,
  lowBackUnroundedVowel,
  lowBackRoundedVowel,
]
