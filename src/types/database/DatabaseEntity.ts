export type DatabaseEntity<T> = {
    id?: string
    save_date?: Date
} & T
