import { Order } from '../types';

export const mockOrders: Order[] = [
  {
    id: 'DEMO-1001',
    customerId: 'cust-101',
    customerName: 'Ramesh Anand Patil',
    customerPhone: '+91 98765 43210',
    deliveryAddress: {
      village: 'Koregaon Khurd',
      landmark: 'Near Hanuman Temple & Gram Panchayat',
      taluka: 'Koregaon',
      district: 'Satara',
      pincode: '415501'
    },
    items: [
      {
        medicineId: 'med-01',
        name: 'GlucoCare Met',
        strength: '500 mg',
        packSize: 'Strip of 30 tablets',
        quantity: 2,
        price: 88,
        requiresPrescription: true
      },
      {
        medicineId: 'med-03',
        name: 'CardioPress Telmi',
        strength: '40 mg',
        packSize: 'Strip of 30 tablets',
        quantity: 1,
        price: 145,
        requiresPrescription: true
      }
    ],
    itemCount: 2,
    totalMrp: 435,
    totalSavings: 114,
    totalAmount: 321,
    paymentMethod: 'COD',
    paymentStatus: 'PENDING',
    orderDate: '28 Sep 2026, 10:15 AM',
    deliverySlot: 'Today, 11:30 AM - 01:30 PM (Scheduled Route)',
    status: 'OUT_FOR_DELIVERY',
    rxStatus: 'APPROVED',
    prescriptionUrl: 'sample_prescription_dr_kulkarni.pdf',
    assignedDeliveryBoyId: 'db-01',
    assignedDeliveryBoyName: 'Ganesh Shinde',
    assignedDeliveryBoyPhone: '+91 97654 32109',
    tamperBagNumber: 'SEAL-4491-KRG',
    deliveryNotes: 'Please ring doorbell or call if father is resting in inner room.',
    otpCode: '4291',
    timeline: [
      { status: 'PLACED', label: 'Order Placed by Customer', timestamp: '28 Sep, 10:15 AM', completed: true },
      { status: 'RX_VERIFIED', label: 'Prescription Verified by Licensed Pharmacist', timestamp: '28 Sep, 10:45 AM', completed: true },
      { status: 'STOCK_CONFIRMED', label: 'Batch Stock Confirmed & Allocated', timestamp: '28 Sep, 11:00 AM', completed: true },
      { status: 'PACKING', label: 'Packed & Barcode Sealed in Tamper-Proof Bag', timestamp: '28 Sep, 11:20 AM', completed: true },
      { status: 'READY_FOR_DELIVERY', label: 'Ready for Route Dispatch at Hub', timestamp: '28 Sep, 11:35 AM', completed: true },
      { status: 'ASSIGNED', label: 'Assigned to Rider Ganesh Shinde', timestamp: '28 Sep, 11:40 AM', completed: true },
      { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery (Rider En Route)', timestamp: '28 Sep, 12:05 PM', completed: true },
      { status: 'DELIVERED', label: 'Delivered to Doorstep with OTP Confirmation', timestamp: 'Pending', completed: false }
    ]
  },
  {
    id: 'DEMO-1002',
    customerId: 'cust-102',
    customerName: 'Suresh Deshmukh',
    customerPhone: '+91 98221 65432',
    deliveryAddress: {
      village: 'Rahimatpur Gaon',
      landmark: 'Opposite Cooperative Bank',
      taluka: 'Koregaon',
      district: 'Satara',
      pincode: '415511'
    },
    items: [
      {
        medicineId: 'med-05',
        name: 'ThyroBalance Sodium',
        strength: '50 mcg',
        packSize: 'Bottle of 100 tablets',
        quantity: 1,
        price: 175,
        requiresPrescription: true
      },
      {
        medicineId: 'med-07',
        name: 'GastroShield Omez',
        strength: '20 mg',
        packSize: 'Strip of 20 capsules',
        quantity: 2,
        price: 85,
        requiresPrescription: false
      }
    ],
    itemCount: 2,
    totalMrp: 460,
    totalSavings: 115,
    totalAmount: 345,
    paymentMethod: 'ONLINE_MOCK',
    paymentStatus: 'PAID',
    orderDate: '28 Sep 2026, 09:30 AM',
    deliverySlot: 'Today, 02:00 PM - 05:00 PM',
    status: 'READY_FOR_DELIVERY',
    rxStatus: 'APPROVED',
    prescriptionUrl: 'sample_prescription_thyroid.pdf',
    tamperBagNumber: 'SEAL-4492-RHM',
    deliveryNotes: 'Deliver to general store if home locked.',
    otpCode: '5812',
    timeline: [
      { status: 'PLACED', label: 'Order Placed by Customer', timestamp: '28 Sep, 09:30 AM', completed: true },
      { status: 'RX_VERIFIED', label: 'Prescription Verified by Licensed Pharmacist', timestamp: '28 Sep, 10:00 AM', completed: true },
      { status: 'STOCK_CONFIRMED', label: 'Batch Stock Confirmed', timestamp: '28 Sep, 10:15 AM', completed: true },
      { status: 'PACKING', label: 'Packed & Barcode Sealed', timestamp: '28 Sep, 10:35 AM', completed: true },
      { status: 'READY_FOR_DELIVERY', label: 'Ready for Route Dispatch at Hub', timestamp: '28 Sep, 11:00 AM', completed: true },
      { status: 'ASSIGNED', label: 'Assigned to Rider', timestamp: 'Pending', completed: false },
      { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', timestamp: 'Pending', completed: false },
      { status: 'DELIVERED', label: 'Delivered', timestamp: 'Pending', completed: false }
    ]
  },
  {
    id: 'DEMO-1003',
    customerId: 'cust-103',
    customerName: 'Anita Shankar Ghorpade',
    customerPhone: '+91 97632 10987',
    deliveryAddress: {
      village: 'Pimpode Budruk',
      landmark: 'Near Primary Health Sub-Centre',
      taluka: 'Koregaon',
      district: 'Satara',
      pincode: '415510'
    },
    items: [
      {
        medicineId: 'med-06',
        name: 'AtorvaLip Stat',
        strength: '10 mg',
        packSize: 'Strip of 15 tablets',
        quantity: 2,
        price: 115,
        requiresPrescription: true
      },
      {
        medicineId: 'med-08',
        name: 'RespiraEase Mont',
        strength: '10 mg / 5 mg',
        packSize: 'Strip of 10 tablets',
        quantity: 1,
        price: 99,
        requiresPrescription: true
      }
    ],
    itemCount: 2,
    totalMrp: 460,
    totalSavings: 131,
    totalAmount: 329,
    paymentMethod: 'COD',
    paymentStatus: 'PENDING',
    orderDate: '28 Sep 2026, 11:45 AM',
    deliverySlot: 'Tomorrow Morning',
    status: 'PLACED',
    rxStatus: 'PENDING_VERIFICATION',
    prescriptionUrl: 'sample_prescription_dr_ghorpade.pdf',
    otpCode: '8834',
    timeline: [
      { status: 'PLACED', label: 'Order Placed by Customer', timestamp: '28 Sep, 11:45 AM', completed: true },
      { status: 'RX_VERIFIED', label: 'Prescription Verification Pending', timestamp: 'In Review', completed: false },
      { status: 'STOCK_CONFIRMED', label: 'Stock Confirmation', timestamp: 'Pending', completed: false },
      { status: 'PACKING', label: 'Packaging', timestamp: 'Pending', completed: false },
      { status: 'READY_FOR_DELIVERY', label: 'Ready for Dispatch', timestamp: 'Pending', completed: false },
      { status: 'ASSIGNED', label: 'Assign Rider', timestamp: 'Pending', completed: false },
      { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', timestamp: 'Pending', completed: false },
      { status: 'DELIVERED', label: 'Delivered', timestamp: 'Pending', completed: false }
    ]
  },
  {
    id: 'DEMO-1004',
    customerId: 'cust-104',
    customerName: 'Mahadev Jadhav',
    customerPhone: '+91 94220 11223',
    deliveryAddress: {
      village: 'Kumthe',
      landmark: 'Wada Galli',
      taluka: 'Koregaon',
      district: 'Satara',
      pincode: '415501'
    },
    items: [
      {
        medicineId: 'med-01',
        name: 'GlucoCare Met',
        strength: '500 mg',
        packSize: 'Strip of 30 tablets',
        quantity: 1,
        price: 88,
        requiresPrescription: true
      }
    ],
    itemCount: 1,
    totalMrp: 120,
    totalSavings: 32,
    totalAmount: 88,
    paymentMethod: 'COD',
    paymentStatus: 'PENDING',
    orderDate: '28 Sep 2026, 10:50 AM',
    deliverySlot: 'Today Afternoon',
    status: 'STOCK_CONFIRMED',
    rxStatus: 'APPROVED',
    otpCode: '1092',
    timeline: [
      { status: 'PLACED', label: 'Order Placed', timestamp: '28 Sep, 10:50 AM', completed: true },
      { status: 'RX_VERIFIED', label: 'Prescription Verified', timestamp: '28 Sep, 11:05 AM', completed: true },
      { status: 'STOCK_CONFIRMED', label: 'Stock Confirmed', timestamp: '28 Sep, 11:15 AM', completed: true },
      { status: 'PACKING', label: 'Packing', timestamp: 'Pending', completed: false },
      { status: 'READY_FOR_DELIVERY', label: 'Ready for Dispatch', timestamp: 'Pending', completed: false },
      { status: 'ASSIGNED', label: 'Assign Rider', timestamp: 'Pending', completed: false },
      { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', timestamp: 'Pending', completed: false },
      { status: 'DELIVERED', label: 'Delivered', timestamp: 'Pending', completed: false }
    ]
  },
  {
    id: 'DEMO-0985',
    customerId: 'cust-101',
    customerName: 'Ramesh Anand Patil',
    customerPhone: '+91 98765 43210',
    deliveryAddress: {
      village: 'Koregaon Khurd',
      landmark: 'Near Hanuman Temple & Gram Panchayat',
      taluka: 'Koregaon',
      district: 'Satara',
      pincode: '415501'
    },
    items: [
      {
        medicineId: 'med-01',
        name: 'GlucoCare Met',
        strength: '500 mg',
        packSize: 'Strip of 30 tablets',
        quantity: 2,
        price: 88,
        requiresPrescription: true
      },
      {
        medicineId: 'med-09',
        name: 'VitaZinc CalciPlus',
        strength: '500 mg + 250 IU',
        packSize: 'Bottle of 60 tablets',
        quantity: 1,
        price: 135,
        requiresPrescription: false
      }
    ],
    itemCount: 2,
    totalMrp: 420,
    totalSavings: 109,
    totalAmount: 311,
    paymentMethod: 'COD',
    paymentStatus: 'COLLECTED',
    orderDate: '28 Aug 2026, 09:15 AM',
    deliverySlot: 'Completed',
    status: 'DELIVERED',
    rxStatus: 'APPROVED',
    assignedDeliveryBoyId: 'db-01',
    assignedDeliveryBoyName: 'Ganesh Shinde',
    tamperBagNumber: 'SEAL-3920-KRG',
    otpCode: '9120',
    timeline: [
      { status: 'PLACED', label: 'Order Placed', timestamp: '28 Aug, 09:15 AM', completed: true },
      { status: 'RX_VERIFIED', label: 'Prescription Verified', timestamp: '28 Aug, 09:40 AM', completed: true },
      { status: 'STOCK_CONFIRMED', label: 'Stock Allocated', timestamp: '28 Aug, 09:50 AM', completed: true },
      { status: 'PACKING', label: 'Packed & Barcoded', timestamp: '28 Aug, 10:15 AM', completed: true },
      { status: 'READY_FOR_DELIVERY', label: 'Ready for Dispatch', timestamp: '28 Aug, 10:30 AM', completed: true },
      { status: 'ASSIGNED', label: 'Assigned to Rider Ganesh', timestamp: '28 Aug, 10:35 AM', completed: true },
      { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', timestamp: '28 Aug, 11:00 AM', completed: true },
      { status: 'DELIVERED', label: 'Delivered at Doorstep', timestamp: '28 Aug, 12:45 PM', completed: true }
    ]
  }
];
