import { ref } from 'vue'

export default function useLatexCodeStore() {
  /* states */
  /**
   * Latex code to show on the latex code window
   */
  const $latexCode = ref('')

  /* actions */
  /**
   * Set latex code
   * @param latexCode Code to set
   */
  const $setLatexCode = (latexCode: string) => {
    $latexCode.value = latexCode
  }

  return {
    /* states */
    $latexCode,
    /* actions */
    $setLatexCode,
  }
}

export type LatexCodeStore = ReturnType<typeof useLatexCodeStore>
