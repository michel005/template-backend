import { DatabaseEntity } from './database/DatabaseEntity'

export type UserType = DatabaseEntity<{
    picture?: string
    full_name?: string
    email?: string
    personType?: 'PF' | 'PJ'
    documentType?: 'RG' | 'CPF' | 'CNPJ'
    documentNumber?: string
    password?: string
    birthday?: Date
}>
