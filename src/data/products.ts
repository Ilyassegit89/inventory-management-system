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
    },
    {
        id: 6,
        name: "Lenovo ThinkPad",
        price: 8200,
        quantity: 6,
        category: "Laptops",
        description: "Business laptop with Intel Core i7"
    },
    {
        id: 7,
        name: "MacBook Air M2",
        price: 11500,
        quantity: 4,
        category: "Laptops",
        description: "Apple MacBook Air with M2 chip"
    },
    {
        id: 8,
        name: "ASUS Gaming Laptop",
        price: 14000,
        quantity: 5,
        category: "Laptops",
        description: "Gaming laptop with NVIDIA RTX graphics"
    },
    {
        id: 9,
        name: "Acer Aspire 5",
        price: 5800,
        quantity: 9,
        category: "Laptops",
        description: "Acer laptop for everyday productivity"
    },
    {
        id: 10,
        name: "LG UltraWide Monitor",
        price: 4200,
        quantity: 7,
        category: "Monitors",
        description: "29-inch UltraWide Full HD monitor"
    },
    {
        id: 11,
        name: "Dell 27-inch Monitor",
        price: 3500,
        quantity: 10,
        category: "Monitors",
        description: "27-inch Dell IPS display"
    },
    {
        id: 12,
        name: "ASUS Gaming Monitor",
        price: 5200,
        quantity: 4,
        category: "Monitors",
        description: "144Hz gaming monitor with Full HD resolution"
    },
    {
        id: 13,
        name: "Razer DeathAdder Mouse",
        price: 650,
        quantity: 11,
        category: "Accessories",
        description: "Ergonomic wired gaming mouse"
    },
    {
        id: 14,
        name: "Logitech MX Master 3S",
        price: 1100,
        quantity: 6,
        category: "Accessories",
        description: "Advanced wireless productivity mouse"
    },
    {
        id: 15,
        name: "Corsair K70 Keyboard",
        price: 1300,
        quantity: 5,
        category: "Accessories",
        description: "Mechanical RGB gaming keyboard"
    },
    {
        id: 16,
        name: "HyperX Cloud II",
        price: 900,
        quantity: 8,
        category: "Audio",
        description: "Gaming headset with surround sound"
    },
    {
        id: 17,
        name: "Sony WH-1000XM5",
        price: 3200,
        quantity: 3,
        category: "Audio",
        description: "Wireless noise-cancelling headphones"
    },
    {
        id: 18,
        name: "JBL Flip 6",
        price: 1400,
        quantity: 12,
        category: "Audio",
        description: "Portable Bluetooth speaker"
    },
    {
        id: 19,
        name: "Samsung Galaxy Tab S9",
        price: 7800,
        quantity: 5,
        category: "Tablets",
        description: "Android tablet with AMOLED display"
    },
    {
        id: 20,
        name: "iPad Air",
        price: 8500,
        quantity: 4,
        category: "Tablets",
        description: "Apple iPad Air with powerful M-series chip"
    },
    {
        id: 21,
        name: "Logitech C920 Webcam",
        price: 750,
        quantity: 9,
        category: "Accessories",
        description: "Full HD webcam for video calls"
    },
    {
        id: 22,
        name: "Samsung T7 SSD",
        price: 1200,
        quantity: 14,
        category: "Storage",
        description: "1TB portable external SSD"
    },
    {
        id: 23,
        name: "Seagate External HDD",
        price: 950,
        quantity: 7,
        category: "Storage",
        description: "2TB external hard drive"
    },
    {
        id: 24,
        name: "TP-Link Archer Router",
        price: 850,
        quantity: 6,
        category: "Networking",
        description: "Dual-band Wi-Fi router"
    },
    {
        id: 25,
        name: "Anker Power Bank",
        price: 550,
        quantity: 18,
        category: "Accessories",
        description: "20000mAh portable fast-charging power bank"
    },
    {
    id: 26,
    name: "MSI Gaming Laptop",
    price: 13500,
    quantity: 3,
    category: "Laptops",
    description: "MSI gaming laptop with Intel Core i7 processor"
},
{
    id: 27,
    name: "ASUS ZenBook 14",
    price: 9800,
    quantity: 7,
    category: "Laptops",
    description: "Lightweight laptop for professional work"
},
{
    id: 28,
    name: "BenQ 4K Monitor",
    price: 6200,
    quantity: 5,
    category: "Monitors",
    description: "32-inch 4K UHD professional monitor"
},
{
    id: 29,
    name: "AOC Curved Monitor",
    price: 3800,
    quantity: 9,
    category: "Monitors",
    description: "27-inch curved gaming monitor"
},
{
    id: 30,
    name: "SteelSeries Apex Keyboard",
    price: 1600,
    quantity: 6,
    category: "Accessories",
    description: "RGB mechanical keyboard with customizable keys"
},
{
    id: 31,
    name: "Samsung Galaxy Buds2 Pro",
    price: 1900,
    quantity: 10,
    category: "Audio",
    description: "Wireless earbuds with active noise cancellation"
},
{
    id: 32,
    name: "JBL Tune 760NC",
    price: 1200,
    quantity: 8,
    category: "Audio",
    description: "Wireless headphones with noise cancellation"
},
{
    id: 33,
    name: "Blue Yeti Microphone",
    price: 2100,
    quantity: 4,
    category: "Audio",
    description: "USB condenser microphone for streaming and recording"
},
{
    id: 34,
    name: "iPad Pro 11",
    price: 12500,
    quantity: 5,
    category: "Tablets",
    description: "Apple tablet with M-series processor"
},
{
    id: 35,
    name: "Lenovo Tab P12",
    price: 4200,
    quantity: 7,
    category: "Tablets",
    description: "Android tablet with a large 12.7-inch display"
},
{
    id: 36,
    name: "Kingston NV2 SSD",
    price: 800,
    quantity: 15,
    category: "Storage",
    description: "1TB NVMe internal solid state drive"
},
{
    id: 37,
    name: "SanDisk Ultra USB",
    price: 180,
    quantity: 25,
    category: "Storage",
    description: "128GB USB 3.0 flash drive"
},
{
    id: 38,
    name: "WD My Passport",
    price: 1100,
    quantity: 8,
    category: "Storage",
    description: "2TB portable external hard drive"
},
{
    id: 39,
    name: "TP-Link Deco X20",
    price: 2400,
    quantity: 6,
    category: "Networking",
    description: "Wi-Fi 6 mesh networking system"
},
{
    id: 40,
    name: "Netgear Nighthawk Router",
    price: 3200,
    quantity: 4,
    category: "Networking",
    description: "High-performance dual-band Wi-Fi router"
},
{
    id: 41,
    name: "Anker USB-C Hub",
    price: 650,
    quantity: 18,
    category: "Accessories",
    description: "7-in-1 USB-C hub with HDMI and USB ports"
},
{
    id: 42,
    name: "Logitech Brio Webcam",
    price: 1450,
    quantity: 7,
    category: "Accessories",
    description: "4K webcam for professional video conferencing"
},
{
    id: 43,
    name: "Razer Kraken Headset",
    price: 1100,
    quantity: 9,
    category: "Audio",
    description: "Gaming headset with a noise-isolating microphone"
},
{
    id: 44,
    name: "Xbox Wireless Controller",
    price: 750,
    quantity: 12,
    category: "Accessories",
    description: "Wireless gaming controller compatible with PC and Xbox"
},
{
    id: 45,
    name: "PlayStation 5 Console",
    price: 7200,
    quantity: 3,
    category: "Gaming",
    description: "Sony PlayStation 5 gaming console"
},
{
    id: 46,
    name: "Nintendo Switch OLED",
    price: 4200,
    quantity: 5,
    category: "Gaming",
    description: "Portable gaming console with OLED display"
},
{
    id: 47,
    name: "Canon EOS R50",
    price: 8500,
    quantity: 4,
    category: "Cameras",
    description: "Mirrorless camera for photography and video"
},
{
    id: 48,
    name: "GoPro HERO12",
    price: 4800,
    quantity: 6,
    category: "Cameras",
    description: "Action camera with 5.3K video recording"
},
{
    id: 49,
    name: "Xiaomi Smart Band 9",
    price: 550,
    quantity: 14,
    category: "Wearables",
    description: "Smart fitness band with AMOLED display"
},
{
    id: 50,
    name: "Apple Watch SE",
    price: 2800,
    quantity: 5,
    category: "Wearables",
    description: "Apple smartwatch with fitness and activity tracking"
}
];

export default products;