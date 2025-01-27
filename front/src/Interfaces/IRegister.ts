export interface IRegister{
    name: string;
    email: string;
    address: string;   
    phone: string;
    id: string;
    credential:{
        password: string;
        id: number;
    }
}