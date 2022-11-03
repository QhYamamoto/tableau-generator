type Filter<Base, ExcludedType> = {
  [keys in keyof Base]: Base[keys] extends ExcludedType ? never : keys
}

type RemainingKeys<Base, ExcludedType> = Filter<Base, ExcludedType>[keyof Base]

type Subtype<Base, ExcludedType> = Pick<Base, RemainingKeys<Base, ExcludedType>>

type AnyFunction = (...args: any) => any

type EvalMode = 'automatic' | 'manual'
