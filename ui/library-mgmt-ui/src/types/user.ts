export interface UserInfoInterface {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profilePicturePath: string;
    verifiedAccount: boolean;
    info: string;
    facebookLink: string;
    twitterLink: string;
    youtubeLink: string;
    instagramLink: string;
}

export interface SessionInterface {
    access_token: string;
    expires: string;
    id_token: string;
    user: {
        name: string;
        email: string;
    };
    roles: string[];
    error: string;
}
