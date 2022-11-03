import { describe, test, expect } from 'vitest'
import useConfigStore from '../../store/config'
import { MOCKED_REPOSITORY } from '../mock'

describe('testConfigStore', () => {
  const store = useConfigStore(MOCKED_REPOSITORY)

  test('testUpdatePhoneticElData', () => {
    let elName: PhoneticElement['name'] = 'high front unrounded vowel'
    const feature: DistinctiveFeature = 'bk'
    const value: TernaryOptions = '+'
    let targetEl: PhoneticElement | undefined

    store.$updatePhoneticElData(elName, feature, value)
    const elNameArr = [elName, `unsyllabic ${elName}`, `long ${elName}`]
    expect(MOCKED_REPOSITORY.storeFeatureSetting).toBeCalledTimes(3)
    elNameArr.forEach((name) => {
      targetEl = store.$phoneticElsData.value.find((el) => el.name === name)
      expect(targetEl?.bk).toBe('+')
    })

    elName = 'voiceless alveolar plosive'
    MOCKED_REPOSITORY.storeFeatureSetting.mockClear()
    store.$updatePhoneticElData(elName, feature, value)
    expect(MOCKED_REPOSITORY.storeFeatureSetting).toBeCalledTimes(1)
    targetEl = store.$phoneticElsData.value.find((el) => el.name === elName)
    expect(targetEl?.bk).toBe('+')

    elName = 'non-existent element'
    MOCKED_REPOSITORY.storeFeatureSetting.mockClear()
    store.$updatePhoneticElData(elName, feature, value)
    targetEl = store.$phoneticElsData.value.find((el) => el.name === elName)
    expect(MOCKED_REPOSITORY.storeFeatureSetting).not.toBeCalled()
  })
})
