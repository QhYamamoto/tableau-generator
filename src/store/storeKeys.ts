import { InjectionKey } from 'vue'
import { ConfirmStore } from './confirm'
import { ConfigStore } from './config'
import { LatexCodeStore } from './latexCode'
import { TableauStore } from './tableau'

export const tableauStoreKey: InjectionKey<TableauStore> =
  Symbol('TableauStore')

export const configStoreKey: InjectionKey<ConfigStore> = Symbol('ConfigStore')

export const latexCodeStoreKey: InjectionKey<LatexCodeStore> =
  Symbol('LatexCodeStore')

export const confirmStoreKey: InjectionKey<ConfirmStore> =
  Symbol('ConfirmStore')
