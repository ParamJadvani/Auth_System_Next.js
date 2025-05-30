export interface IRegisterValues {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface ILoginValues {
    email: string;
    password: string;
}

export interface IResetPasswordValues {
    password: string;
    password_confirmation: string;
}

export interface IChangePasswordValues {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}
