export interface Product {
    readonly id: number;
    name: string;
    price: number;
    quantity: number;
    category : string;
    description?: string;
}
