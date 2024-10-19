import { RequestHandler } from 'express-serve-static-core'
import { UserBusiness } from '../../business/UserBusiness'
import { PublicUserType } from '../../types/PublicUserType'
import { UserTokenBusiness } from '../../business/UserTokenBusiness'
import { UserType } from '../../types/UserType'
import { DefaultRouterResolver } from '../DefaultRouterResolver'

export const UserRemoveRequest: RequestHandler<
    string,
    any,
    {
        password?: string
    }
> = (req, res) => {
    DefaultRouterResolver(res, () => {
        UserBusiness.remove({
            currentUser: req.currentUser,
            password: req.body?.password,
        })
    })
}
