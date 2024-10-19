import { RequestHandler } from 'express-serve-static-core'
import { UserBusiness } from '../../business/UserBusiness'
import { DefaultRouterResolver } from '../DefaultRouterResolver'
import { UserTokenBusiness } from '../../business/UserTokenBusiness'

export const UserUpdatePasswordRequest: RequestHandler<
    string,
    any,
    {
        current?: string
        newPassword?: string
        confirmation?: string
    }
> = (req, res) => {
    DefaultRouterResolver(res, () => {
        UserBusiness.updatePassword({
            currentUser: req.currentUser,
            current: req.body.current,
            newPassword: req.body.newPassword,
            confirmation: req.body.confirmation,
        })

        UserTokenBusiness.removeByUserId({ userId: req.currentUser?.id })
    })
}
