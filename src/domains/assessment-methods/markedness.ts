export class MarkednessConstraintMethod {
  public static assessOns: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate
  ) => {
    let res = 0
    const syllables = this.getSyllables(candidate, phoneticElsData)
    syllables.forEach((syll) => {
      const peakI = this.getSonorityInfo(syll).peakI
      // No violation if there is a non-vocalic segment before the peak
      for (let i = 0; i < peakI; i++) {
        if (syll[i].voc !== '+') return
      }
      res++
    })
    return res
  }

  public static assessCoda: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate
  ) => {
    let res = 0
    const syllables = this.getSyllables(candidate, phoneticElsData)
    syllables.forEach((syll) => {
      const peakI = this.getSonorityInfo(syll).peakI
      // Violation if there are non-vocalic segments after peak
      for (let i = peakI + 1; i < syll.length; i++) {
        if (
          syll[i].category !== 'vowel' &&
          syll[i].category !== 'unsyllabic-vowel' // Here, assume that unsyllabic vowels belong to a nuclear position
        ) {
          res++
          break
        }
      }
    })
    return res
  }

  public static assessSegmentalMarkedness: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate,
    targetSegment
  ) => {
    return candidate
      .convertToPhoneticEls(phoneticElsData)
      .filter((el) => el.name === targetSegment?.name).length
  }

  public static assessComplexity: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate
  ) => {
    const syllables = this.getSyllables(candidate, phoneticElsData)
    return syllables.filter((syll) => {
      const len = syll.length
      if (len < 2) return false // With only less than two elements, it can't construct complex onset nor complex coda
      if (
        (syll[0].cons === '+' && syll[1].cons === '+') || // Check whether onset is complex
        (syll[len - 1].cons === '+' && syll[len - 2].cons === '+') // Check whether coda is complex
      )
        return true
    }).length
  }

  public static assessAlignL: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate
  ) => {
    const inputEls = input.convertToPhoneticEls(
      phoneticElsData,
      'filter out',
      'index'
    )
    const candEls = candidate.convertToPhoneticEls(
      phoneticElsData,
      'retain',
      'coalescence-border',
      'coalescence-content',
      'insertion-content'
    )

    return inputEls[0].symbol === candEls[0].symbol ? 0 : 1
  }

  public static assessAlignR: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate
  ) => {
    const inputEls = input.convertToPhoneticEls(
      phoneticElsData,
      'filter out',
      'index'
    )
    const candEls = candidate.convertToPhoneticEls(
      phoneticElsData,
      'retain',
      'coalescence-border',
      'coalescence-content',
      'insertion-content'
    )

    return inputEls[inputEls.length - 1].symbol ===
      candEls[candEls.length - 1].symbol
      ? 0
      : 1
  }

  public static assessPositiveFeaturalMarkedness: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate,
    targetSegment,
    targetProperty
  ) => {
    if (!targetProperty) return 0
    const candEls = candidate.convertToPhoneticEls(phoneticElsData)
    return candEls.filter((el) => el[targetProperty] === '+').length
  }

  public static assessNegativeFeaturalMarkedness: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate,
    targetSegment,
    targetProperty
  ) => {
    if (!targetProperty) return 0
    const candEls = candidate.convertToPhoneticEls(phoneticElsData)
    return candEls.filter((el) => el[targetProperty] === '-').length
  }

  public static assessSSP: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate
  ) => {
    let res = 0
    const syllables = this.getSyllables(candidate, phoneticElsData)
    syllables.forEach((syll) => {
      const { sonorities, peakI } = this.getSonorityInfo(syll)
      for (let i = 1; i < sonorities.length; i++) {
        if (i <= peakI && sonorities[i] < sonorities[i - 1]) res++
        if (i > peakI && sonorities[i] > sonorities[i - 1]) res++
      }
    })
    return res
  }

  public static assessNoDiph: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate
  ) => {
    let res = 0
    const syllables = this.getSyllables(candidate, phoneticElsData)
    syllables.forEach((syll) => {
      // check if one syllable contains two or more vowels
      const numOfVowels = syll.filter((el) => el.voc === '+').length
      if (numOfVowels >= 2) res++
    })
    return res
  }

  /* 
    ------------------------------ Private methods ------------------------------
   */
  private static getSonorityInfo = (
    syllable: PhoneticElement[]
  ): {
    sonorities: number[]
    peakI: number
  } => {
    const sonorities = syllable.map((el) => el.sonority ?? 0)
    let maxSonority = -1
    let peakI = -1

    for (let i = 0; i < sonorities.length; i++) {
      if (sonorities[i] > maxSonority) {
        maxSonority = sonorities[i]
        peakI = i
      }
    }

    return {
      sonorities: sonorities,
      peakI: peakI,
    }
  }

  private static getSyllables = (
    candidate: CandidateInterface,
    phoneticElsData: PhoneticElement[]
  ) => candidate.convertEachSyllableToPhoneticEls(phoneticElsData)
}
