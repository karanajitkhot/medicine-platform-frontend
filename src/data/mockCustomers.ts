import { CustomerProfile, RegularMedicineItem } from '../types';

export const mockCustomerProfile: CustomerProfile = {
  id: 'cust-101',
  name: 'Ramesh Anand Patil',
  phone: '+91 98765 43210',
  email: 'ramesh.patil.demo@graminmed.in',
  village: 'Koregaon Khurd',
  landmark: 'Near Hanuman Temple & Gram Panchayat',
  taluka: 'Koregaon',
  district: 'Satara',
  pincode: '415501',
  familyMembers: [
    { name: 'Ramesh Patil (Self)', relation: 'Self', age: 48 },
    { name: 'Suman Patil', relation: 'Spouse', age: 44 },
    { name: 'Anand Patil', relation: 'Father (Chronic BP & Diabetes)', age: 74 }
  ]
};

export const initialRegularMedicines: RegularMedicineItem[] = [
  {
    id: 'reg-01',
    medicineId: 'med-01',
    medicineName: 'GlucoCare Met',
    strength: '500 mg',
    packSize: 'Strip of 30 tablets',
    quantity: 2,
    frequency: 'Monthly',
    expectedRefillDate: '10 Oct 2026',
    status: 'Active',
    customerPrice: 88,
    requiresPrescription: true
  },
  {
    id: 'reg-02',
    medicineId: 'med-03',
    medicineName: 'CardioPress Telmi',
    strength: '40 mg',
    packSize: 'Strip of 30 tablets',
    quantity: 1,
    frequency: 'Monthly',
    expectedRefillDate: '10 Oct 2026',
    status: 'Active',
    customerPrice: 145,
    requiresPrescription: true
  },
  {
    id: 'reg-03',
    medicineId: 'med-05',
    medicineName: 'ThyroBalance Sodium',
    strength: '50 mcg',
    packSize: 'Bottle of 100 tablets',
    quantity: 1,
    frequency: 'Quarterly',
    expectedRefillDate: '15 Nov 2026',
    status: 'Active',
    customerPrice: 175,
    requiresPrescription: true
  }
];
