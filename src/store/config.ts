import { Ref, ref } from 'vue'
import { Repository } from '../repository'
import { PHONETIC_ELEMENTS } from '../consts/phonetic-elements'

export default function useConfigStore(repository?: RepositoryInterface) {
  const $repository = repository ?? new Repository()
  // Load user-defined feature data
  const featureDataArr = $repository.getFeatureDataArr()
  const loadedElsData: PhoneticElement[] = PHONETIC_ELEMENTS.map((el) => {
    const copiedEl = { ...el }
    featureDataArr.forEach((fJson) => {
      if (fJson.elName === copiedEl.name) {
        copiedEl[fJson.feature] = fJson.value
      }
    })
    return copiedEl
  })

  /* states */
  /**
   * User-defined setting data of sounds and auxiliary symbols
   */
  const $phoneticElsData: Ref<PhoneticElement[]> = ref(loadedElsData)

  /* actions */
  /**
   * Update user-defined data of a sound or an auxiliary symbol
   * @param elName Name of element to update
   * @param feature Feature of the element to update
   * @param newValue New value of the feature to assign to the element
   */
  const $updatePhoneticElData = (
    elName: PhoneticElement['name'],
    feature: DistinctiveFeature,
    newValue: TernaryOptions
  ) => {
    $phoneticElsData.value.forEach((el) => {
      if (
        el.name !== elName &&
        el.name !== `unsyllabic ${elName}` &&
        el.name !== `long ${elName}`
      )
        return

      el[feature] = newValue

      try {
        $repository.storeFeatureSetting(el.name, feature, newValue)
      } catch (error) {
        throw alert('Error occurred while storing feature setting')
      }
    })
  }

  return {
    /* states */
    $phoneticElsData,
    /* actions */
    $updatePhoneticElData,
  }
}

export type ConfigStore = ReturnType<typeof useConfigStore>
