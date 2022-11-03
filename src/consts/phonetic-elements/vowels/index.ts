import { HIGH_VOWELS } from './high'
import { LOW_VOWELS } from './low'
import { MID_HIGH_VOWELS } from './mid-high'
import { MID_LOW_VOWELS } from './mid-low'
import { OTHER_VOWELS } from './others'

const syllabicVowels: PhoneticElement[] = [
  ...HIGH_VOWELS,
  ...MID_HIGH_VOWELS,
  ...MID_LOW_VOWELS,
  ...LOW_VOWELS,
  ...OTHER_VOWELS,
]

const unsyllabicVowels: PhoneticElement[] = syllabicVowels.map((vow) => {
  return {
    ...vow,
    name: 'unsyllabic ' + vow.name,
    symbol: vow.symbol + '\u{032F}',
    tipa: `\\textsubarch{${vow.tipa ?? vow.symbol}}`,
    category: 'unsyllabic-vowel',
    syl: '-',
  }
})

const longVowels: PhoneticElement[] = syllabicVowels.map((vow) => {
  return {
    ...vow,
    name: 'long ' + vow.name,
    symbol: vow.symbol + 'ː',
    tipa: vow.tipa ? vow.tipa + 'ː' : undefined,
    category: 'long-vowel',
  }
})

export const VOWELS: PhoneticElement[] = [
  ...syllabicVowels,
  ...unsyllabicVowels,
  ...longVowels,
]

export const VOWEL_SYMBOLS = syllabicVowels.map((el) => el.symbol)
