import { RequestHandler } from 'express-serve-static-core'
import { UserBusiness } from '../../business/UserBusiness'
import { PublicUserType } from '../../types/PublicUserType'
import { UserTokenBusiness } from '../../business/UserTokenBusiness'
import { UserType } from '../../types/UserType'
import { DefaultRouterResolver } from '../DefaultRouterResolver'

export const UserCreateRequest: RequestHandler<string, UserType> = (
    req,
    res
) => {
    DefaultRouterResolver(res, () => {
        UserBusiness.create({ user: req.body })
    })
}
