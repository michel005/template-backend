import { RequestHandler } from 'express-serve-static-core'
import { UserBusiness } from '../../business/UserBusiness'
import { PublicUserType } from '../../types/PublicUserType'
import { UserTokenBusiness } from '../../business/UserTokenBusiness'
import { UserType } from '../../types/UserType'
import { DefaultRouterResolver } from '../DefaultRouterResolver'

export const UserUpdateRequest: RequestHandler<string, UserType> = (
    req,
    res
) => {
    DefaultRouterResolver(res, () => {
        const user = UserBusiness.update({
            currentUser: req.currentUser,
            user: req.body,
        })

        return {
            ...user,
            password: undefined,
            id: undefined,
            save_date: undefined,
        }
    })
}
