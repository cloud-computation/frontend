import { StringSchema } from 'yup'

declare module 'yup' {
    interface StringSchema {
        equalTo(ref: any, msg: any): StringSchema;
    }
}
