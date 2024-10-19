import { DatabaseEntity } from './database/DatabaseEntity'

export type UserType = DatabaseEntity<{
    full_name?: string
    email?: string
    password?: string
    birthday?: Date
}>
