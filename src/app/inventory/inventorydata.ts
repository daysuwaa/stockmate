interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  updated: string;
  price: number;
}

export const inventoryData: InventoryItem[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    quantity: 45,
    status: 'In Stock',
    updated: '2025-01-10',
    price: 89.99
  },
  {
    id: '2',
    name: 'Coffee Maker',
    category: 'Appliances',
    quantity: 12,
    status: 'Low Stock',
    updated: '2025-01-09',
    price: 149.99
  },
  {
    id: '3',
    name: 'Desk Chair',
    category: 'Furniture',
    quantity: 0,
    status: 'Out of Stock',
    updated: '2025-01-08',
    price: 299.99
  },
  {
    id: '4',
    name: 'Laptop Stand',
    category: 'Electronics',
    quantity: 78,
    status: 'In Stock',
    updated: '2025-01-12',
    price: 35.99
  },
  {
    id: '5',
    name: 'Water Bottle',
    category: 'Accessories',
    quantity: 156,
    status: 'In Stock',
    updated: '2025-01-11',
    price: 24.99
  },
  {
    id: '6',
    name: 'Smartphone Case',
    category: 'Electronics',
    quantity: 8,
    status: 'Low Stock',
    updated: '2025-01-07',
    price: 19.99
  },
  {
    id: '7',
    name: 'Desk Lamp',
    category: 'Furniture',
    quantity: 23,
    status: 'In Stock',
    updated: '2025-01-13',
    price: 75.99
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    quantity: 34,
    status: 'In Stock',
    updated: '2025-01-06',
    price: 129.99
  },
  {
    id: '9',
    name: 'Office Mug',
    category: 'Accessories',
    quantity: 5,
    status: 'Low Stock',
    updated: '2025-01-05',
    price: 12.99
  },
  {
    id: '10',
    name: 'Keyboard',
    category: 'Electronics',
    quantity: 67,
    status: 'In Stock',
    updated: '2025-01-14',
    price: 79.99
  }
];
