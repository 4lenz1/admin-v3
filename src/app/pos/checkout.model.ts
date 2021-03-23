import { Product } from './product.model';
export class Checkout {
    id: string;
    products: Product[];
    transaction: Transaction;
    Recipe: Recipe;
    Carrier: [];

}

export class Transaction {
    totalPrice: number;
    timestamp: Date;
    paymethod: string;
    remark: string;
    status: string;
}
export class Recipe {
    No: string;
    taxRate: number;
    taxNumber: string;
    transactionPrice: number;
}
export class Carrier {
    type: string;
    No: string;
}