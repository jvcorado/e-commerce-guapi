export type ProductType = {
    id: string;
    name: string;
    quantity?: number | 1;
    price: number | null;
    description: string | null;
    image: string;
    currency?: string;
}


