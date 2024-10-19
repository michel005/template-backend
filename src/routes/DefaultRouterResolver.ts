import { Response } from 'express'

export const DefaultRouterResolver = (
    res: Response,
    callback: () => any,
    dontUseReturn: boolean = false
) => {
    try {
        if (dontUseReturn) {
            callback()
        } else {
            res.status(200).send(callback())
        }
    } catch (e: any) {
        console.error(e)
        res.status(422).send(e)
    }
}
