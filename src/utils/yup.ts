import { StringSchema } from "yup";
import * as Yup from "yup";

export function equalTo(ref: any, msg: any): StringSchema {
    return Yup.string().test({
        name: "equalTo",
        exclusive: false,
        message: msg,
        params: {
            reference: ref.path,
        },
        test: function (value: any) {
            return value === this.resolve(ref);
        },
    });
}
