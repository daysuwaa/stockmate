import React from 'react'

const Modal = ({
  isOpen,
  onClose,
  children,
//   title,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
//   title: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0000006a] bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white mx-4 w-full max-w-md rounded-lg shadow-lg p-6 relative">
        {/* <h2 className="text-lg font-semibold mb-4">{title}</h2> */}
        {children}
        <button
          onClick={onClose}
          className="absolute top-3 text-3xl cursor-pointer  right-3 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
export default Modal