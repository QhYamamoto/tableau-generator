export class FaithfulnessConstraintMethod {
  public static assessMax: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate,
    targetSegment,
    targetProperty
  ) => {
    if (!targetProperty)
      return candidate
        .convertToPhoneticEls(phoneticElsData)
        .filter((el) => el.type === 'deleted-segment').length

    const inputEls = input.convertToPhoneticEls(phoneticElsData, 'retain')
    const candEls = candidate.convertToPhoneticEls(
      phoneticElsData,
      'retain',
      'deleted-segment'
    )

    let res = 0
    candEls.forEach((el, index) => {
      if (
        el.type === 'deleted-segment' &&
        inputEls[index][targetProperty] === '+'
      )
        res++
    })

    return res
  }

  public static assessDep: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate,
    targetSegment,
    targetProperty
  ) => {
    if (!targetProperty)
      return candidate
        .convertToPhoneticEls(phoneticElsData)
        .filter((el) => el.type === 'insertion-start').length

    const candEls = candidate.convertToPhoneticEls(
      phoneticElsData,
      'filter out',
      'index'
    )

    let res = 0
    candEls.forEach((el, index) => {
      if (
        el.type === 'insertion-start' &&
        candEls[index + 1][targetProperty] === '+'
      )
        res++
    })

    return res
  }

  public static assessIdent: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate,
    targetSegment,
    targetProperty
  ) => {
    if (!targetProperty)
      return candidate
        .convertToPhoneticEls(phoneticElsData)
        .filter((el) => el.type === 'mutation-start').length

    let inputEls = input.convertToPhoneticEls(phoneticElsData, 'retain')
    let candEls = candidate.convertToPhoneticEls(
      phoneticElsData,
      'retain',
      'mutation-border',
      'deleted-segment'
    )

    let res = 0
    let mutationStartI = candEls.findIndex((el) => el.type === 'mutation-start')
    while (mutationStartI !== -1) {
      const elAfterMutation = candEls[mutationStartI + 1]
      const elBeforeMutationI = mutationStartI
      /* 
        Example:
          inputEls  =   [['a'],        ['b'],        ['c']]
          candEls   =   [['a'], ['('], ['B'], [')'], ['c']]
          elAfterMutation = 'B'
          elBeforeMutationI = 1 = mutationStartI
       */

      if (
        inputEls[elBeforeMutationI][targetProperty] !==
        elAfterMutation[targetProperty]
      )
        res++

      candEls = candEls.slice(mutationStartI + 3)
      inputEls = inputEls.slice(elBeforeMutationI + 1)
      mutationStartI = candEls.findIndex((el) => el.type === 'mutation-start')
    }
    return res
  }

  public static assessUniformity: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate
  ) => {
    return candidate
      .convertToPhoneticEls(phoneticElsData, 'filter out', 'index')
      .filter((el) => el.type === 'coalescence-start').length
  }

  public static assessContiguity: AssessmentMethod = (
    phoneticElsData,
    input,
    candidate
  ) => {
    // TODO: Supports cases involving coalescence
    const inpMorphs = input.morphemes
    const candMorphs = candidate.morphemes

    return candMorphs.filter((candM, candMI) => {
      const inpM = inpMorphs[candMI]
      if (candM.length > inpM.length) {
        return candM.includes(inpM) ? false : true
      } else if (candM.length < inpM.length) {
        return inpM.includes(candM) ? false : true
      } else {
        let tmpStr = ''
        candidate
          .convertToPhoneticEls(
            phoneticElsData,
            'retain',
            'coalescence-content',
            'morpheme-border'
          )
          .forEach((el) => (tmpStr += el.symbol))
        candM = tmpStr.split('-')[candMI]
        return inpM.includes(candM) ? false : true
      }
    }).length
  }
}
