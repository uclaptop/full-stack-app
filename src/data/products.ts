export interface Laptop {
  id: string;
  name: string;
  brand: 'Dell' | 'HP' | 'Lenovo' | 'Apple' | 'Accessories';
  specs: string;
  category: 'Business' | 'High Performance' | 'Graphics' | 'Student' | 'Developer' | 'Accessories';
  tag?: 'Best Seller' | 'New' | 'Offer';
  price: number;
  mrp: number;
  image: string;
  secondary_image?: string;
}

export const products: Laptop[] = [
  {
    id: '1',
    name: 'HP ProBook 650 G5 i5 8th Gen Refurbished Laptop',
    brand: 'HP',
    specs: 'i5 8th Gen | 8GB DDR4 | 256GB NVMe SSD | 15.6" FHD',
    category: 'Business',
    tag: 'Best Seller',
    price: 29795,
    mrp: 81000,
    image: '/hp-probook-640-g5.png'
  },
  {
    id: '2',
    name: 'HP EliteBook 820 G3 i5 6th Gen Refurbished Laptop',
    brand: 'HP',
    specs: 'i5 6th Gen | 8GB DDR4 | 256GB SSD | 12.5" Ultra-Slim',
    category: 'Student',
    tag: 'Offer',
    price: 18620,
    mrp: 54000,
    image: '/hp-elitebook-840-g3.png'
  },
  {
    id: '3',
    name: 'Dell Latitude 5580 i7 7th Gen Refurbished Laptop',
    brand: 'Dell',
    specs: 'i7 7th Gen | 8GB DDR4 | 256GB SSD | 15.6" Full HD',
    category: 'High Performance',
    tag: 'Best Seller',
    price: 26566,
    mrp: 76000,
    image: '/dell-latitude-5580.png'
  },
  {
    id: '4',
    name: 'Dell Latitude 5420 i7 11th Gen Refurbished Laptop',
    brand: 'Dell',
    specs: 'i7 11th Gen | 16GB DDR4 | 512GB NVMe SSD | Iris Xe',
    category: 'Developer',
    tag: 'New',
    price: 33895,
    mrp: 86000,
    image: '/dell-latitude-5420.png'
  },
  {
    id: '5',
    name: 'Dell Latitude 7420 i7 11th Gen Refurbished Laptop',
    brand: 'Dell',
    specs: 'i7 11th Gen | 16GB DDR4 | 512GB SSD | Carbon Fiber',
    category: 'High Performance',
    tag: 'Best Seller',
    price: 35432,
    mrp: 83000,
    image: '/dell-latitude-7540.png'
  },
  {
    id: '6',
    name: 'Lenovo ThinkPad T490 i5 8th Gen Business Laptop',
    brand: 'Lenovo',
    specs: 'i5 8th Gen | 16GB DDR4 | 512GB NVMe SSD | Backlit KB',
    category: 'Business',
    tag: 'Best Seller',
    price: 29999,
    mrp: 84000,
    image: '/t490.png'
  },
  {
    id: '7',
    name: 'HP EliteBook 840 G5 i5 8th Gen Refurbished Laptop',
    brand: 'HP',
    specs: 'i5 8th Gen | 16GB DDR4 | 512GB NVMe SSD | Bang & Olufsen',
    category: 'Business',
    tag: 'New',
    price: 27999,
    mrp: 79000,
    image: '/hp-elitebook-840-g5.png'
  },
  {
    id: '8',
    name: 'Dell Precision 5530 i7 8th Gen 4GB Nvidia GPU',
    brand: 'Dell',
    specs: 'i7 8th Gen | 16GB RAM | 512GB SSD | 4GB Quadro GPU',
    category: 'Graphics',
    tag: 'Best Seller',
    price: 39999,
    mrp: 98000,
    image: '/dell-precision-5530.png'
  },
  {
    id: '9',
    name: 'Dell Latitude 5400 i5 8th Gen Corporate Laptop',
    brand: 'Dell',
    specs: 'i5 8th Gen | 8GB DDR4 | 256GB NVMe SSD | 14.0" FHD',
    category: 'Business',
    tag: 'Offer',
    price: 25999,
    mrp: 74000,
    image: '/dell-latitude-5400.png'
  },
  {
    id: '10',
    name: 'Dell Latitude 3570 i3 6th Gen Budget Laptop',
    brand: 'Dell',
    specs: 'i3 6th Gen | 8GB RAM | 256GB SSD | 15.6" Anti-Glare',
    category: 'Student',
    tag: 'Offer',
    price: 16499,
    mrp: 48000,
    image: '/dell-latitude-3570.png'
  },
  {
    id: '11',
    name: 'Dell Latitude 5490 i5 8th Gen Workstation',
    brand: 'Dell',
    specs: 'i5 8th Gen | 8GB DDR4 | 256GB SSD | Type-C Power Delivery',
    category: 'Business',
    price: 24850,
    mrp: 72000,
    image: '/dell-latitude-5490.png'
  },
  {
    id: '12',
    name: 'HP EliteBook 745 G6 AMD Ryzen 5 Pro Laptop',
    brand: 'HP',
    specs: 'Ryzen 5 Pro | 8GB DDR4 | 256GB SSD | Radeon Vega Graphics',
    category: 'Business',
    tag: 'New',
    price: 23499,
    mrp: 68000,
    image: '/hp-elitebook-745-g6.png'
  }
];
