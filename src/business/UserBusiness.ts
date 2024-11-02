import { UserType } from '../types/UserType'
import { Database } from '../database/Database'
import { UserTokenBusiness } from './UserTokenBusiness'
import { LoginType } from '../types/LoginType'
import { ErrorCollection } from '../types/ErrorCollection'
import { UserRecoveryBusiness } from './UserRecoveryBusiness'

export class UserBusiness {
    static database: Database<UserType> = new Database<UserType>('user')

    static login = ({ email, password }: LoginType) => {
        const users = this.database.find(
            (x) => x.email === email && x.password === password
        )
        if (users.length > 0) {
            return UserTokenBusiness.createToken({ user_id: users[0].id })
        } else {
            ErrorCollection.simple('error', 'USER-008')
        }
    }

    private static validate = ({ entity }: { entity: any }) => {
        const errors = new ErrorCollection()

        if (!entity.full_name) {
            errors.add('full_name', 'USER-001')
        }
        if (!entity.email) {
            errors.add('email', 'USER-002')
        }
        if (!entity.birthday) {
            errors.add('birthday', 'USER-003')
        }
        if (!entity.password) {
            errors.add('password', 'USER-004')
        }
        if (!entity.personType) {
            errors.add('personType', 'USER-005')
        }

        errors.throw()
    }

    private static validateUpdate = ({ entity }: { entity: any }) => {
        const errors = new ErrorCollection()

        if (!entity.full_name) {
            errors.add('full_name', 'USER-001')
        }
        if (!entity.birthday) {
            errors.add('birthday', 'USER-003')
        }

        errors.throw()
    }

    static create = ({ user }: { user: Omit<UserType, 'id'> }) => {
        this.validate({ entity: user })
        const sameEmail = this.database.find((x) => x.email === user.email)
        if (sameEmail.length > 0) {
            ErrorCollection.simple('email', 'USER-005')
        }
        this.database.save({
            picture: user.picture,
            full_name: user.full_name,
            email: user.email,
            birthday: user.birthday,
            password: user.password,
        })
    }

    static update = ({
        currentUser,
        user,
    }: {
        currentUser?: UserType
        user: Omit<UserType, 'id'>
    }) => {
        this.validateUpdate({ entity: user })
        const sameEmail = this.database.find(
            (x) => x.email === user.email && x.id !== currentUser?.id
        )
        if (sameEmail.length > 0) {
            ErrorCollection.simple('email', 'USER-005')
        }
        return this.database.save({
            ...currentUser,
            picture: user.picture,
            full_name: user.full_name,
            birthday: user.birthday,
        })
    }

    static updatePassword = ({
        currentUser,
        current,
        newPassword,
        confirmation,
    }: {
        currentUser?: UserType
        current?: string
        newPassword?: string
        confirmation?: string
    }) => {
        const errors = new ErrorCollection()

        if (currentUser?.password !== current) {
            errors.add('current', 'USER-009')
        }

        if (newPassword !== confirmation) {
            errors.add('newPassword', 'USER-010')
        }

        errors.throw()

        UserTokenBusiness.removeByUserId({ userId: currentUser?.id })
        this.database.save({
            ...currentUser,
            password: newPassword,
        })
    }

    static remove = ({
        currentUser,
        password,
    }: {
        currentUser?: UserType
        password?: string
    }) => {
        if (currentUser?.password !== password) {
            ErrorCollection.simple('password', 'USER-007')
        }
        UserRecoveryBusiness.removeByUserId({ userId: currentUser?.id })
        UserTokenBusiness.removeByUserId({ userId: currentUser?.id })
        return this.database.remove(currentUser?.id)
    }
}
