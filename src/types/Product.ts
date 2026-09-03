import type { Category } from "./Category";
import type { TechnicalInformation } from "./TechnicalInformation";

export interface Product {
    productId: string;
    name: string;
    description: string;
    image: string;
    status: string;
    category: Category;
    technicalInformation: TechnicalInformation;
}