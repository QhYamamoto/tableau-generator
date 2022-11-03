import {
  FILTERING_TARGET_OBJS,
  SOUND_SYMBOLS,
} from '../../../consts/phonetic-elements'

/**
 * Convert string to Array of PhoneticElement object
 * @param str Target String
 * @param phoneticElsData Currently set phonetic elements data
 * @returns Array of PhoneticElement object
 */
export const toPhoneticElement = (
  str: string,
  phoneticElsData: PhoneticElement[]
): PhoneticElement[] => {
  const result: PhoneticElement[] = []

  // Sort PhoneticElement objects by length of their symbol
  const sortedPhoneticElsData = phoneticElsData.sort(
    (a, b) => b.symbol.length - a.symbol.length
  )

  // For each phonetic element, search if its symbol is included in target string
  sortedPhoneticElsData.forEach((el) => {
    const symbol = el.symbol

    let symbolI = str.indexOf(symbol)
    while (symbolI !== -1) {
      result[symbolI] = el
      str = str.replace(symbol, '*'.repeat(symbol.length))
      symbolI = str.indexOf(symbol)
    }

    // Break loop if whole string is composed by '*'
    if (str === '*'.repeat(str.length)) return
  })

  return result.filter((res) => res)
}

/**
 * Filter out given targets from value string
 * @param value Value string
 * @param filteringFlg Indicate if filter out or retain filteringTargets
 * @param filteringTargets Elements which has to be filtered out
 * @returns Filtered value string
 */
export const filterOut = (
  value: string,
  filteringFlg: 'filter out' | 'retain',
  ...filteringTargets: FilteringTarget[]
) => {
  FILTERING_TARGET_OBJS.forEach((targetObj) => {
    if (
      filteringFlg === 'filter out' &&
      !filteringTargets.includes(targetObj.type)
    )
      return
    if (filteringFlg === 'retain' && filteringTargets.includes(targetObj.type))
      return
    value = value.replace(targetObj.regexp, '')
  })

  return value
}

/**
 * Remove brackets and their inner text from a string
 * @param str Target string
 * @param brackets Target brackets
 * @returns String without brackets and their inner text
 */
export const removeStringInBrackets = (
  str: string,
  brackets: [string, string]
): string => {
  const [opening, closing] = brackets
  let openingI = str.indexOf(opening)
  let closingI = str.indexOf(closing)
  while (openingI !== -1 && closingI !== -1) {
    str = str.substring(0, openingI) + str.substring(closingI + 1)
    openingI = str.indexOf(opening)
    closingI = str.indexOf(closing)
  }
  return str
}

/**
 * Get array of ValueFragment object which which contains information about subscription
 * @param value Value string
 * @returns Array of ValueFragment object
 */
export const getValueFragments = (value: string): ValueFragment[] => {
  const fragments: ValueFragment[] = []
  let regex = /([0-9]+,*)+/g
  while (regex.test(value)) {
    const numStartI = value.search(regex)
    const numEndI = regex.lastIndex
    const nonNumFrg = {
      str: value.substring(0, numStartI),
      sub: false,
    }
    const numFrg = {
      str: value.substring(numStartI, numEndI),
      sub: true,
    }
    fragments.push(nonNumFrg, numFrg)

    value = value.substring(numEndI)
    regex = /([0-9]+,*)+/g // Initialize regex for next test
  }

  if (value) {
    const restFrg = {
      str: value,
      sub: false,
    }
    fragments.push(restFrg)
  }

  return fragments
}

/**
 * Check if brackets are correctly used
 * @param value Value string
 * @param brackets Bracket pair to be checked
 */
export const checkBracketUse = (value: string, brackets: [string, string]) => {
  const opening = brackets[0]
  const closing = brackets[1]
  let openingI = value.indexOf(opening)
  let closingI = value.indexOf(closing)
  while (openingI !== -1 || closingI !== -1) {
    if (openingI === -1) throw 'Missing opening bracket'
    if (closingI === -1) throw 'Missing closing bracket'

    const diff = closingI - openingI
    let condition = diff > 1 // At least one letter should be surrounded by brackets

    // Except case of brackets for coalescence('{', '}'), surrounded letters should be one of the Sound_SYMBOLS
    if (opening !== '{') {
      const surroundedLetters = value.substring(openingI + 1, closingI)
      condition = condition && SOUND_SYMBOLS.includes(surroundedLetters)
    }

    if (!condition) throw 'Invalid use of brackets'

    value = value.substring(closingI + 1)
    openingI = value.indexOf(opening)
    closingI = value.indexOf(closing)
  }
}
