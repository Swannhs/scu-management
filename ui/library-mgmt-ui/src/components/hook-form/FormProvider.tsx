import React, {FC} from "react";
import {FormProvider as Form} from "react-hook-form";

interface FormProviderInterface {
    children: React.ReactNode;
    methods: any;
    onSubmit: Function,
}

const FormProvider: FC<FormProviderInterface> = ({children, methods, onSubmit}) => {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    );
};

export default FormProvider;
