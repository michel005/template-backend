import { ErrorUtils } from '../utils/ErrorUtils'

export class ErrorCollection {
    public errors: {
        [key: string]: string
    } = {}

    public add = (field?: string, code?: string) => {
        this.errors[field || 'error'] = ErrorUtils.byCode(code)
    }

    public haveError = () => {
        return Object.keys(this.errors).length > 0
    }

    public throw = () => {
        if (this.haveError()) {
            throw this.errors
        }
    }

    public static simple = (field?: string, code?: string) => {
        throw {
            [field || 'error']: ErrorUtils.byCode(code),
        }
    }
}
