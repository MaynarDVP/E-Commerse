import { IUser } from "./IUsers";

export interface ILoginSuccess {
    login: boolean,
    user: IUser;
    token:string;
    }