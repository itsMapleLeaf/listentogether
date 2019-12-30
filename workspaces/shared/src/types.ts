export type ValueOf<T> = T[keyof T]

export type Dict<T> = { [_ in string]?: T }
