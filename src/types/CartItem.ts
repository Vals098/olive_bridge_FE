import type { Product } from "./Product";
import type { ProductVariant } from "./ProductVariant";

export interface CartItem {
    product: Product;
    variant: ProductVariant;
    quantity: number;
}