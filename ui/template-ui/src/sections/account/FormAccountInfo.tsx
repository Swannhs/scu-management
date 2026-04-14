"use client";

import React, {FC} from "react";
import RHFTextField from "@/components/hook-form/RHFTextField";
import FormProvider from "@/components/hook-form/FormProvider";
import {useForm} from "react-hook-form";
import ButtonPrimary from "@/shared/ButtonPrimary";
import {UserInfoInterface} from "@/types/user";
import Avatar from "@/shared/Avatar";
import {updateUserInfo} from "@/api/userPrivateApi";
import {toast} from "react-toastify";

interface FormAccountInfoProps {
    userInfo: UserInfoInterface;
}

const FormAccountInfo: FC<FormAccountInfoProps> = ({userInfo}) => {
    const methods = useForm({
        defaultValues: {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phoneNumber: userInfo.phoneNumber,
            profilePicturePath: userInfo.profilePicturePath,
            info: userInfo.info,
            facebookLink: userInfo.facebookLink,
            twitterLink: userInfo.twitterLink,
            youtubeLink: userInfo.youtubeLink,
            instagramLink: userInfo.instagramLink,
        }
    });

    const {
        handleSubmit
    } = methods;

    const onSubmitHandler = async (data) => {
        const response = await updateUserInfo(data);
        if (response.status === 200) {
            const data = await response.json();
            toast.success(data.message);
        } else {
            const data = await response.json();
            toast.error(data.message)
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 flex items-start">
                    <div className="relative rounded-full overflow-hidden flex">
                        <Avatar sizeClass="w-32 h-32"/>
                        <div
                            className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span className="mt-1 text-xs">Change Image</span>
                        </div>
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                </div>
                <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
                    <div>
                        <RHFTextField name="firstName" label='First Name'/>
                    </div>
                    {/* ---- */}
                    <div>
                        <RHFTextField name="lastName" label='Last Name'/>
                    </div>
                    {/* ---- */}
                    <div>
                        <RHFTextField name="phoneNumber" label='Phone Number'/>
                    </div>
                    {/* ---- */}
                    <div>
                        <RHFTextField name="facebookLink" label='Facebook Link'/>
                    </div>
                    {/* ---- */}
                    <div>
                        <RHFTextField name="twitterLink" label='Twitter Link'/>
                    </div>
                    {/* ---- */}
                    <div>
                        <RHFTextField name="youtubeLink" label='Youtube Link'/>
                    </div>
                    {/* ---- */}
                    <div>
                        <RHFTextField name="instagramLink" label='Instagram Link'/>
                    </div>
                    {/* ---- */}
                    <div>
                        <RHFTextField name="info" label='About You'/>
                    </div>
                    <div className="pt-2">
                        <ButtonPrimary type="submit">
                            Update Profile
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default FormAccountInfo;
