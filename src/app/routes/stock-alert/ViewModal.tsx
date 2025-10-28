import { Tag } from "lucide-react";
import React from "react";

type Item = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  status: string;
};

type ViewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
};

const ViewModal: React.FC<ViewModalProps> = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        {/* <h1 className="text-xl font-semibold mb-3">Item Details</h1> */}
        <div className=" text-xl p-6 bg-red-500 flex items-center rounded-t-lg">
         <Tag/>
         <div className="flex ml-4 flex-col">
         <p className="font-semibold ">Product Name:</p>
        <p className=" text-[14px] font-semibold ">{item.name.toUpperCase()}</p>
        </div>
        </div>
       <div className="p-6">
        <h1 className="text-lg mb-3 font-semibold">Product Information</h1>
        {/* <hr></hr> */}
        <div className="my-3">
        {/* <p className="bg-gray-100 p-3 mb-3"><strong>SKU:</strong> {item.sku}</p> */}
         <p className="bg-gray-100 p-3 mb-3"><strong>ID:</strong> {item.id}</p>
        <p className="bg-gray-100 p-3 mb-3"><strong>Category:</strong> {item.category}</p>
        <p className="bg-gray-100 p-3 mb-3"><strong>Quantity:</strong> {item.quantity}</p>
        <strong className="bg-gray-100 p-3 mb-3 flex ">Status:<p className={`${item.status==='Low Stock' ? 'text-yellow-500' : 'text-red-500'} ml-1`}>{item.status}</p></strong>
       </div>
        <button
          onClick={onClose}
          className="cursor-pointer mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;