export const $stopScroll = (selector: string): void => {
  const el = document.querySelector<HTMLElement>(selector)
  el ? (el.style.overflow = 'hidden') : null
}

export const $restartScroll = (selector: string): void => {
  const el = document.querySelector<HTMLElement>(selector)
  el ? (el.style.overflow = 'auto') : null
}

export const $showEl = (selector: string): void => {
  document.querySelector(selector)?.classList.add('is-shown')
}

export const $hideEl = (selector: string): void => {
  document.querySelector(selector)?.classList.remove('is-shown')
}

export const $getEscapedStrForRegExp = (str: string): string => {
  return str
    .replace(
      /\\|\*|\+|\.|\?|\{|\}|\(|\)|\[|\]|\^|\$|\//g,
      (matchStr) => `\\${matchStr}`
    )
    .replace('|||', '|\\||')
}
