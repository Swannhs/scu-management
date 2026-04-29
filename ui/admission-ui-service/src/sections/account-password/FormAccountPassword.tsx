"use client";

import React, {FC} from "react";
import FormProvider from "@/components/hook-form/FormProvider";
import {useForm} from "react-hook-form";
import RHFTextField from "@/components/hook-form/RHFTextField";

const FormAccountPassword: FC = () => {

    const methods = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    });

    const {handleSubmit} = methods;

    const onSubmitHandler = async (data) => {

    }

    return (
        <FormProvider methods={methods} onSubmit={onSubmitHandler}>
            <div className="flex-grow mt-10 md:mt-0 max-w-3xl space-y-6">
                <div>
                    <RHFTextField name="currentPassword" label='Current Password'/>
                </div>
                <div>
                    <RHFTextField name="newPassword" label='New Password'/>
                </div>
                <div>
                    <RHFTextField name="confirmPassword" label='Confirm Password'/>
                </div>
            </div>
        </FormProvider>
    );
}

export default FormAccountPassword;