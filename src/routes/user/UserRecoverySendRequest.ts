import { RequestHandler } from 'express-serve-static-core'
import { UserBusiness } from '../../business/UserBusiness'
import { DefaultRouterResolver } from '../DefaultRouterResolver'
import { UserTokenBusiness } from '../../business/UserTokenBusiness'
import { UserRecoveryBusiness } from '../../business/UserRecoveryBusiness'

export const UserRecoverySendRequest: RequestHandler<
    string,
    any,
    any,
    {
        email?: string
    }
> = (req, res) => {
    DefaultRouterResolver(res, () => {
        UserRecoveryBusiness.send({ email: req.query.email })
    })
}
