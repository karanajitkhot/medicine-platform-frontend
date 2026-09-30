export type UserRole = 'customer' | 'delivery' | 'pharmacy' | 'admin';

export type Language = 'en' | 'hi' | 'mr';

export type MedicineCategory = 
  | 'Diabetes' 
  | 'Blood Pressure' 
  | 'Thyroid' 
  | 'Cholesterol' 
  | 'Respiratory' 
  | 'Gastro' 
  | 'General Wellness';

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  strength: string;
  packSize: string;
  manufacturer: string;
  category: MedicineCategory;
  mrp: number;
  customerPrice: number;
  requiresPrescription: boolean;
  dosageForm: 'Tablet' | 'Capsule' | 'Syrup' | 'Inhaler' | 'Drops';
  inStock: boolean;
  stockCount: number;
  description: string;
}

export interface RegularMedicineItem {
  id: string;
  medicineId: string;
  medicineName: string;
  strength: string;
  packSize: string;
  quantity: number;
  frequency: 'Monthly' | 'Bi-Monthly' | 'Every 45 Days' | 'Quarterly';
  expectedRefillDate: string;
  status: 'Active' | 'Paused';
  customerPrice: number;
  requiresPrescription: boolean;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export type OrderStatus = 
  | 'PLACED' 
  | 'RX_VERIFIED' 
  | 'STOCK_CONFIRMED' 
  | 'PACKING' 
  | 'READY_FOR_DELIVERY' 
  | 'ASSIGNED' 
  | 'OUT_FOR_DELIVERY' 
  | 'DELIVERED' 
  | 'CANCELLED';

export type RxStatus = 'NOT_REQUIRED' | 'PENDING_VERIFICATION' | 'APPROVED' | 'REJECTED';

export interface OrderItem {
  medicineId: string;
  name: string;
  strength: string;
  packSize: string;
  quantity: number;
  price: number;
  requiresPrescription: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: {
    village: string;
    landmark: string;
    taluka: string;
    district: string;
    pincode: string;
  };
  items: OrderItem[];
  itemCount: number;
  totalMrp: number;
  totalSavings: number;
  totalAmount: number;
  paymentMethod: 'COD' | 'ONLINE_MOCK';
  paymentStatus: 'PENDING' | 'COLLECTED' | 'PAID';
  orderDate: string;
  deliverySlot: string;
  status: OrderStatus;
  rxStatus: RxStatus;
  prescriptionUrl?: string;
  assignedDeliveryBoyId?: string;
  assignedDeliveryBoyName?: string;
  assignedDeliveryBoyPhone?: string;
  tamperBagNumber?: string;
  deliveryNotes?: string;
  otpCode?: string;
  timeline: {
    status: OrderStatus;
    label: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface DeliveryBoy {
  id: string;
  name: string;
  phone: string;
  assignedRoute: string;
  status: 'AVAILABLE' | 'ON_DELIVERY' | 'OFF_DUTY';
  activeDeliveriesCount: number;
  vehicleType: string;
}

export interface InventoryItem {
  id: string;
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  expiryDate: string;
  availableQuantity: number;
  purchasePrice: number;
  mrp: number;
  customerPrice: number;
  safetyStock: number;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'EXPIRING_SOON' | 'OUT_OF_STOCK';
}

export interface ProcurementItem {
  medicineId: string;
  medicineName: string;
  expectedDemand: number;
  currentStock: number;
  safetyStock: number;
  suggestedProcurement: number;
  unitCost: number;
  status: 'Draft' | 'Approved' | 'PO_Sent';
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  village: string;
  taluka: string;
  district: string;
  pincode: string;
  landmark: string;
  familyMembers: {
    name: string;
    relation: string;
    age: number;
  }[];
}
