import { IProduct } from "./IProduct";

export interface IOrders {
    id: number,
    status: string;
    date:string;
    products: IProduct[];
    }