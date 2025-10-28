import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { InventoryItem } from '@/app/types/InventoryItem';

export const exportToExcel = (data: InventoryItem[]) => {
  const formatted = data.map(({ name, category, quantity, status, price }) => ({
    Name: name,
    Category: category,
    Quantity: quantity,
    Status: status,
    Price: price,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formatted);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(fileData, `inventory-${new Date().toISOString().split("T")[0]}.xlsx`);
};