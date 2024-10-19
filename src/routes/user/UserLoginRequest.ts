import { RequestHandler } from 'express-serve-static-core'
import { LoginType } from '../../types/LoginType'
import { UserBusiness } from '../../business/UserBusiness'
import { DefaultRouterResolver } from '../DefaultRouterResolver'

export const UserLoginRequest: RequestHandler<
    string,
    {
        token: string
    },
    LoginType
> = (req, res) => {
    DefaultRouterResolver(res, () => {
        return {
            token: UserBusiness.login(req.body),
        }
    })
}
