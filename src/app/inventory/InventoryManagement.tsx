"use client"
import React, { useState, useMemo } from 'react';
import Modal from './Modal';
import { 
  ChevronLeft, 
  ChevronRight, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  EyeIcon,
} from 'lucide-react';

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

export default function InventoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const categories = useMemo(() => {
    const cats = [...new Set(inventoryData.map(item => item.category))];
    return ['All', ...cats];
  }, []);

  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

  const filteredData = useMemo(() => {
    return inventoryData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
      const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, filterCategory, filterStatus]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const ActionButton = ({ icon: Icon, onClick, className = "", title }: {
    icon: React.ElementType;
    onClick: () => void;
    className?: string;
    title: string;
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors duration-200 ${className}`}
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);

const openModal = (type: 'view' | 'edit' | 'delete', item: InventoryItem) => {
  setSelectedItem(item);
  setModalType(type);
};

const closeModal = () => {
  setModalType(null);
  setSelectedItem(null);
};
  
  return (
    
    <div className="bg-white rounded-xl shadow-lg m-6 overflow-hidden">
      {/* Filters */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">ID: {item.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                  {item.quantity.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                  {formatPrice(item.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  {formatDate(item.updated)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center gap-1">
                    <ActionButton
                    icon={Eye}
                    onClick={() => openModal('view', item)}
                    className="hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
                    title="View Details"
                    />
                    <ActionButton
                    icon={Edit}
                    onClick={() => openModal('edit', item)}
                    className="hover:bg-green-100 hover:text-green-600 cursor-pointer"
                    title="Edit Item"
                    />
                    <ActionButton
                    icon={Trash2}
                    onClick={() => openModal('delete', item)}
                    className="hover:bg-red-100 hover:text-red-600 cursor-pointer"
                    title="Delete Item"
                     />
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-gray-50 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-700">
            of {filteredData.length} items
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* modallll */}
      {/* to view inevntory */}
      <Modal isOpen={!!modalType} onClose={closeModal} >
      {modalType === 'view' && selectedItem && (
     <div className="space-y-4 text-sm">
        <div className='flex items-center'>
        <EyeIcon className='bg-blue-100 border border-blue-600 p-2 rounded-full h-8 w-8'/>
        <h1 className='font-bold text-lg ml-2'>VIEW ITEM</h1>
        </div>
  <div className="grid grid-cols-2 gap-4">
    <div className="flex flex-col">
      <span className="text-gray-900  font-medium mb-1">Name</span>
      <span className="text-gray-500 font-semibold">{selectedItem.name}</span>
    </div>
    
    <div className="flex flex-col">
      <span className="text-gray-900  font-medium mb-1">Category</span>
      <span className="text-gray-500 ">{selectedItem.category}</span>
    </div>
  </div>
  
  <div className="grid grid-cols-2 gap-4">
    <div className="flex flex-col">
      <span className="text-gray-900  font-medium mb-1">Quantity</span>
      <span className="text-gray-500  font-mono">{selectedItem.quantity}</span>
    </div>
    
    <div className="flex flex-col">
      <span className="text-gray-900  font-medium mb-1">Status</span>
      <span className={`font-medium ${
        selectedItem.status === 'In Stock' ? 'text-green-600 dark:text-green-400' :
        selectedItem.status === 'Low Stock' ? 'text-amber-600 dark:text-amber-400' :
        selectedItem.status === 'Out of Stock' ? 'text-red-600 dark:text-red-400' :
        'text-gray-900 '
      }`}>
        {selectedItem.status}
      </span>
    </div>
  </div>
  
  <div className="grid grid-cols-2 gap-4">
    <div className="flex flex-col">
      <span className="text-gray-900  font-medium mb-1">Price</span>
      <span className="text-gray-500  font-semibold">${selectedItem.price}</span>
    </div>
    
    <div className="flex flex-col">
      <span className="text-gray-900  font-medium mb-1">Last Updated</span>
      <span className="text-gray-500  text-xs">{formatDate(selectedItem.updated)}</span>
    </div>
  </div>
</div>
  )}

  {modalType === 'edit' && selectedItem && (
    <form className="space-y-4">
         <div className='flex items-center'>
        <Edit className='bg-yellow-100 border border-yellow-600 p-2 rounded-full h-8 w-8'/>
        <h1 className='font-bold text-lg ml-2'>EDIT ITEM</h1>
        </div>
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input type="text" defaultValue={selectedItem.name} className="w-full border px-3 py-1.5 rounded" />
      </div>
      <div>
        <label className="block text-sm mb-1">Quantity</label>
        <input type="number" defaultValue={selectedItem.quantity} className="w-full border px-3 py-1.5 rounded" />
      </div>
      <div>
        <label className="block text-sm mb-1">Stock Details?</label>
        <select className="border px-3 py-2 w-full rounded text-sm">
           <option value="">Select Status</option>
           <option value="In Stock">In Stock</option>
           <option value="Low Stock">Low Stock</option>
           <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Price</label>
        <input type="number" defaultValue={selectedItem.price} className="w-full border px-3 py-1.5 rounded" />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white text-sm px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  )}

  {modalType === 'delete' && selectedItem && (
    <div>
      <p className="mb-4 text-sm">Are you sure you want to delete <strong>{selectedItem.name}</strong>?</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={closeModal}
          className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            console.log('Deleted:', selectedItem.id);
            closeModal();
          }}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  )}
      </Modal>
    </div>
  );
}