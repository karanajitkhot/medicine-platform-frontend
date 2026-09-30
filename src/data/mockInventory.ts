import { InventoryItem, ProcurementItem } from '../types';

export const mockInventory: InventoryItem[] = [
  {
    id: 'inv-01',
    medicineId: 'med-01',
    medicineName: 'GlucoCare Met 500mg',
    batchNumber: 'LOT-GLU-2026A',
    expiryDate: '12/2027',
    availableQuantity: 80,
    purchasePrice: 62,
    mrp: 120,
    customerPrice: 88,
    safetyStock: 30,
    status: 'IN_STOCK'
  },
  {
    id: 'inv-02',
    medicineId: 'med-02',
    medicineName: 'GlucoCare Met SR 1000mg',
    batchNumber: 'LOT-GLU-SR09',
    expiryDate: '09/2027',
    availableQuantity: 24,
    purchasePrice: 58,
    mrp: 110,
    customerPrice: 82,
    safetyStock: 25,
    status: 'LOW_STOCK'
  },
  {
    id: 'inv-03',
    medicineId: 'med-03',
    medicineName: 'CardioPress Telmi 40mg',
    batchNumber: 'LOT-TEL-4412',
    expiryDate: '05/2028',
    availableQuantity: 40,
    purchasePrice: 102,
    mrp: 195,
    customerPrice: 145,
    safetyStock: 25,
    status: 'IN_STOCK'
  },
  {
    id: 'inv-04',
    medicineId: 'med-04',
    medicineName: 'CardioPress Amlod 5mg',
    batchNumber: 'LOT-AML-8820',
    expiryDate: '08/2027',
    availableQuantity: 120,
    purchasePrice: 42,
    mrp: 90,
    customerPrice: 65,
    safetyStock: 40,
    status: 'IN_STOCK'
  },
  {
    id: 'inv-05',
    medicineId: 'med-05',
    medicineName: 'ThyroBalance Sodium 50mcg',
    batchNumber: 'LOT-THY-1102',
    expiryDate: '03/2027',
    availableQuantity: 15,
    purchasePrice: 125,
    mrp: 230,
    customerPrice: 175,
    safetyStock: 20,
    status: 'LOW_STOCK'
  },
  {
    id: 'inv-06',
    medicineId: 'med-06',
    medicineName: 'AtorvaLip Stat 10mg',
    batchNumber: 'LOT-ATO-7731',
    expiryDate: '11/2027',
    availableQuantity: 70,
    purchasePrice: 80,
    mrp: 160,
    customerPrice: 115,
    safetyStock: 30,
    status: 'IN_STOCK'
  },
  {
    id: 'inv-07',
    medicineId: 'med-07',
    medicineName: 'GastroShield Omez 20mg',
    batchNumber: 'LOT-OMZ-9912',
    expiryDate: '04/2028',
    availableQuantity: 210,
    purchasePrice: 55,
    mrp: 115,
    customerPrice: 85,
    safetyStock: 50,
    status: 'IN_STOCK'
  }
];

export const mockProcurementData: ProcurementItem[] = [
  {
    medicineId: 'med-01',
    medicineName: 'GlucoCare Met 500mg',
    expectedDemand: 250,
    currentStock: 80,
    safetyStock: 30,
    suggestedProcurement: 200,
    unitCost: 62,
    status: 'Draft'
  },
  {
    medicineId: 'med-03',
    medicineName: 'CardioPress Telmi 40mg',
    expectedDemand: 180,
    currentStock: 40,
    safetyStock: 25,
    suggestedProcurement: 165,
    unitCost: 102,
    status: 'Draft'
  },
  {
    medicineId: 'med-05',
    medicineName: 'ThyroBalance Sodium 50mcg',
    expectedDemand: 90,
    currentStock: 15,
    safetyStock: 20,
    suggestedProcurement: 95,
    unitCost: 125,
    status: 'Draft'
  },
  {
    medicineId: 'med-02',
    medicineName: 'GlucoCare Met SR 1000mg',
    expectedDemand: 80,
    currentStock: 24,
    safetyStock: 25,
    suggestedProcurement: 80,
    unitCost: 58,
    status: 'Approved'
  },
  {
    medicineId: 'med-06',
    medicineName: 'AtorvaLip Stat 10mg',
    expectedDemand: 110,
    currentStock: 70,
    safetyStock: 30,
    suggestedProcurement: 70,
    unitCost: 80,
    status: 'Draft'
  }
];
