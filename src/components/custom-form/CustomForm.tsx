import React, { useCallback } from "react";
import { Formik } from "formik";
import { FormikErrors, FormikProps } from "formik/dist/types";
import { stubObject } from "lodash";

interface ICustomFormProps<T> {
    data?: T;
    validationSchema?: any | (() => any);
    validateOnChange?: boolean;
    validateOnBlur?: boolean;

    render(props?: FormikProps<T>): void;

    onSubmit?(data: T): void;

    validate?(data: T): void | object | Promise<FormikErrors<T>>;
}

export const CustomForm = <T extends object>(props: ICustomFormProps<T>) => {
    const {
        data = {},
        onSubmit,
        validationSchema,
        render,
        validate,
        validateOnBlur = true,
        validateOnChange = true,
    } = props;

    const handleSubmit = useCallback(
        (data: T) => {
            if (!onSubmit) {
                return;
            }
            onSubmit(data);
        },
        [onSubmit],
    );

    return (
        <Formik<T>
            initialValues={data || stubObject()}
            onSubmit={handleSubmit}
            validate={validate}
            validationSchema={validationSchema}
            validateOnChange={validateOnChange}
            validateOnBlur={validateOnBlur}
            enableReinitialize
        >
            {(props) => render(props)}
        </Formik>
    );
};
