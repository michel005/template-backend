import { RequestHandler } from 'express-serve-static-core'
import { UserBusiness } from '../../business/UserBusiness'
import { DefaultRouterResolver } from '../DefaultRouterResolver'
import { UserTokenBusiness } from '../../business/UserTokenBusiness'
import { UserRecoveryBusiness } from '../../business/UserRecoveryBusiness'

export const UserRecoveryChangePasswordRequest: RequestHandler<
    string,
    any,
    any,
    {
        email?: string
        code?: string
        password?: string
        confirmation?: string
    }
> = (req, res) => {
    DefaultRouterResolver(res, () => {
        UserRecoveryBusiness.changePassword(req.query)
    })
}
