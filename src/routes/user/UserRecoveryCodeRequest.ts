import { RequestHandler } from 'express-serve-static-core'
import { UserBusiness } from '../../business/UserBusiness'
import { DefaultRouterResolver } from '../DefaultRouterResolver'
import { UserTokenBusiness } from '../../business/UserTokenBusiness'
import { UserRecoveryBusiness } from '../../business/UserRecoveryBusiness'

export const UserRecoveryCodeRequest: RequestHandler<
    string,
    any,
    any,
    {
        email?: string
        code?: string
    }
> = (req, res) => {
    DefaultRouterResolver(res, () => {
        UserRecoveryBusiness.code({
            email: req.query.email,
            code: req.query.code,
        })
    })
}
