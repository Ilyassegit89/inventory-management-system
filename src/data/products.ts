import type {Product} from '../types/Product.ts'



const products: Product[] = [
    {
        id: 1,
        name: "HP Laptop",
        price: 6000,
        quantity: 12,
        category: "Laptops",
        description: "HP laptop with Intel Core i5 processor"
    },
    {
        id: 2,
        name: "Logitech Mouse",
        price: 150,
        quantity: 3,
        category: "Accessories",
        description: "Wireless Logitech mouse"
    },
    {
        id: 3,
        name: "Samsung Monitor",
        price: 2500,
        quantity: 8,
        category: "Monitors",
        description: "24-inch Samsung Full HD monitor"
    },
    {
        id: 4,
        name: "Mechanical Keyboard",
        price: 450,
        quantity: 15,
        category: "Accessories",
        description: "RGB mechanical gaming keyboard"
    },
    {
        id: 5,
        name: "Dell Laptop",
        price: 7500,
        quantity: 2,
        category: "Laptops",
        description: "Dell laptop with Intel Core i7 processor"
    } 
];

export default products;